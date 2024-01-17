import { Result } from 'true-myth';
import { Schema } from 'zod';

import { ApiError } from './error.types';

export type URLDetails = {
  baseURL: string;
  path: string;
  paramMap?: Record<string, string | number | string[] | undefined>;
  id?: string;
};

export type ResponseDataType =
  | Record<string, string | number | object | null>
  | Array<unknown>
  | string;

export type PayloadDataType = Record<string, unknown>;

export type ResponseData<T extends ResponseDataType> = T;

export type ResponseSchema<T extends ResponseDataType> = Schema<
  ResponseData<T>
>;

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

export type ApiSuccess<T extends ResponseDataType, H> = {
  data: ResponseData<T>;
  headers: Partial<H>;
};

export type ApiResponse<T extends ResponseDataType, H> = Result<
  ApiSuccess<T, H>,
  ApiError
>;
