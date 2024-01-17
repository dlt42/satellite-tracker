import { z } from 'zod';

import { callApi } from '../api/apiHandler';
import { ApiResponse } from '../api/apiHandler.types';
import { processApiRequestError } from '../api/error';
import {
  NewSatellite,
  Satellite,
  Satellites,
  satelliteSchema,
  satellitesSchema,
} from './satellite.types';

export const getAllSatellites = async (): Promise<
  ApiResponse<Satellites, {}>
> => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const path = `api/satellites`;

  if (!baseURL) {
    return processApiRequestError('Base URL not in config', {
      baseURL: '',
      path,
    });
  }

  const result = await callApi<Satellites, void, {}>({
    requestHeaders: {},
    superType: 'nopayload',
    type: 'get',
    schema: satellitesSchema,
    urlDetails: {
      baseURL,
      path,
      paramMap: {},
    },
  });

  return result;
};

export const getSatelliteById = async (
  id: number
): Promise<ApiResponse<Satellite, Error>> => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const path = `api/satellites/${id}`;

  if (!baseURL) {
    return processApiRequestError('Base URL not in config', {
      baseURL: '',
      path,
    });
  }

  const result = await callApi<Satellite, void, {}>({
    requestHeaders: {},
    superType: 'nopayload',
    type: 'get',
    schema: satelliteSchema,
    urlDetails: {
      baseURL,
      path,
      paramMap: {},
    },
  });
  return result;
};

export const createSatellite = async (
  satellite: NewSatellite
): Promise<ApiResponse<Satellite, Error>> => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const path = `api/satellites`;

  if (!baseURL) {
    return processApiRequestError('Base URL not in config', {
      baseURL: '',
      path,
    });
  }

  const result = await callApi<Satellite, NewSatellite, {}>({
    requestHeaders: {},
    superType: 'payload',
    type: 'post',
    schema: satelliteSchema,
    payload: satellite,
    urlDetails: {
      baseURL,
      path,
      paramMap: {},
    },
  });

  return result;
};

export const updateSatelliteById = async (
  satellite: Satellite
): Promise<ApiResponse<Satellite, Error>> => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const path = `api/satellites/${satellite.id}`;

  if (!baseURL) {
    return processApiRequestError('Base URL not in config', {
      baseURL: '',
      path,
    });
  }

  const result = await callApi<Satellite, Satellite, {}>({
    requestHeaders: {},
    superType: 'payload',
    type: 'put',
    schema: satelliteSchema,
    payload: satellite,
    urlDetails: {
      baseURL,
      path,
      paramMap: {},
    },
  });

  return result;
};

export const deleteSatelliteById = async (
  id: number
): Promise<ApiResponse<{}, Error>> => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const path = `api/satellites/${id}`;

  if (!baseURL) {
    return processApiRequestError('Base URL not in config', {
      baseURL: '',
      path,
    });
  }

  const result = await callApi<{}, void, {}>({
    requestHeaders: {},
    superType: 'nopayload',
    type: 'delete',
    schema: z.string(),
    urlDetails: {
      baseURL,
      path,
      paramMap: {},
    },
  });

  return result;
};
