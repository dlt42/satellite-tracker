import { Result } from 'true-myth';

export type ResponseDataType =
  | Record<string, string | number | object | null>
  | Array<unknown>
  | string;

export type PayloadDataType = Record<string, unknown>;

export type DomainSuccess<T extends ResponseDataType> = {
  data: T;
};

export class DomainError {
  public error!: string;
  public causes!: string[];
}

export type DomainResponseFull<
  T extends ResponseDataType,
  S extends DomainSuccess<T>,
  E extends DomainError,
> = Result<S, E>;

export type DomainResponse<T extends ResponseDataType> = DomainResponseFull<
  T,
  DomainSuccess<T>,
  DomainError
>;
