import { Schema } from 'zod';

import {
  DomainError,
  DomainResponseFull,
  DomainSuccess,
  PayloadDataType,
  ResponseDataType,
} from '../domain/domain.types';

type ApiErrorBase = DomainError & {
  urlDetails: URLDetails;
};

type RequestError = ApiErrorBase & {
  type: 'REQUEST';
};

type ValidationError = ApiErrorBase & {
  type: 'VALIDATION';
  response: ResponseDataType;
};

export type ApiError = RequestError | ValidationError;

export type URLDetails = {
  baseURL: string;
  path: string;
  paramMap?: Record<string, string | number | string[] | undefined>;
  id?: string;
};

export type ResponseSchema<T extends ResponseDataType> = Schema<T>;

export type ApiRequest<
  T extends ResponseDataType,
  P extends PayloadDataType | void,
  H,
> = {
  urlDetails: URLDetails;
  requestHeaders: Record<string, string>;
  requiredResponseHeaders?: (keyof H)[];
  schema: ResponseSchema<T>;
} & (P extends PayloadDataType
  ? {
      superType: 'payload';
      type: 'patch' | 'put' | 'post';
      payload: P;
    }
  : {
      superType: 'nopayload';
      type: 'get' | 'delete';
    });

export type ApiSuccess<T extends ResponseDataType, H> = DomainSuccess<T> & {
  headers: Partial<H>;
};

export type ApiResponse<T extends ResponseDataType, H> = DomainResponseFull<
  T,
  ApiSuccess<T, H>,
  ApiError
>;
