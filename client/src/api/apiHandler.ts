import { Result } from 'true-myth';

import { PayloadDataType, ResponseDataType } from '../domain/domain.types';
import {
  ApiError,
  ApiRequest,
  ApiResponse,
  ApiSuccess,
  ResponseSchema,
  URLDetails,
} from './apiHandler.types';
import { convertZodError, processApiRequestError } from './error';

const constructApiURL = ({
  baseURL,
  path,
  id,
  paramMap,
}: URLDetails): string => {
  const url = new URL(baseURL);
  url.pathname += `${path}`;
  if (id) {
    url.pathname += `/${id}`;
  }

  if (paramMap) {
    const params = new URLSearchParams();
    const pairs = Object.entries(paramMap);
    pairs.forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }

      if (typeof value === 'number') {
        params.append(key, value.toString());
      } else if (typeof value === 'string') {
        params.append(key, value);
      } else {
        params.append(key, value.join(','));
      }
    });

    url.search = params.toString();
  }

  return url.toString();
};

const validateResponse = <T extends ResponseDataType, H>(
  schema: ResponseSchema<T>,
  response: T,
  urlDetails: URLDetails,
  responseHeadersData: H
): Result<ApiSuccess<T, H>, ApiError> => {
  const parseResult = schema.safeParse(response);

  return parseResult.success
    ? Result.ok({
        type: 'data',
        data: parseResult.data,
        headers: responseHeadersData,
      })
    : Result.err({
        type: 'VALIDATION',
        error: 'Zod Validation failure',
        causes: convertZodError(parseResult.error),
        response,
        urlDetails,
      });
};

const getResponseHeadersData = <H>(
  response: Response,
  requiredHeaders: (keyof H)[] | undefined
): Partial<H> => {
  const responseHeadersData: Partial<H> = {};

  if (requiredHeaders && responseHeadersData) {
    requiredHeaders.forEach(
      (requiredHeader) =>
        (responseHeadersData[requiredHeader] = Object(response.headers).get(
          requiredHeader.toString()
        ))
    );
  }

  return responseHeadersData;
};

const callApi = async <
  T extends ResponseDataType,
  P extends void | PayloadDataType,
  H,
>(
  params: ApiRequest<T, P, H>
): Promise<ApiResponse<T, H>> => {
  const {
    urlDetails,
    superType,
    type,
    requestHeaders,
    requiredResponseHeaders,
    schema,
  } = params;
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...requestHeaders,
    };
    const redirect: RequestRedirect = 'follow';
    const requestOptions = {
      method: type.toUpperCase(),
      headers,
      redirect,
    };
    const url = constructApiURL(urlDetails);

    let response;
    switch (superType) {
      case 'nopayload': {
        response = await fetch(url, requestOptions);
        break;
      }
      case 'payload': {
        const { payload } = params;
        response = await fetch(url, {
          ...requestOptions,
          body: JSON.stringify(payload),
        });
        break;
      }
    }

    const responseHeadersData = getResponseHeadersData(
      response,
      requiredResponseHeaders
    );
    const data =
      type === 'get' || type === 'post' || type === 'put'
        ? await response.json()
        : await response.text();
    return validateResponse(schema, data, urlDetails, responseHeadersData);
  } catch (error) {
    return processApiRequestError(error, urlDetails);
  }
};

export { callApi };
