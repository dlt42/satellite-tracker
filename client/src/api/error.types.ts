import { ResponseData, ResponseDataType, URLDetails } from './apiHandler.types';

type ApiErrorBase = {
  error: string;
  causes: string[];
  urlDetails: URLDetails;
};

type RequestError = ApiErrorBase & {
  type: 'REQUEST';
};

type ValidationError = ApiErrorBase & {
  type: 'VALIDATION';
  response: ResponseData<ResponseDataType>;
};

export type ApiError = RequestError | ValidationError;
