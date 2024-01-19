import { z } from 'zod';

import { callApi } from '../api/apiHandler';
import { processApiRequestError } from '../api/error';
import {
  CreateSatellite,
  DeleteSatelliteById,
  GetAllSatellites,
  GetSatelliteById,
  NewSatellite,
  Satellite,
  Satellites,
  satelliteSchema,
  SatellitesInterface,
  satellitesSchema,
  UpdateSatellite,
} from '../domain/satellite.types';

const getAllSatellites: GetAllSatellites = async () => {
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

const getSatelliteById: GetSatelliteById = async (id) => {
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

const createSatellite: CreateSatellite = async (satellite) => {
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

const updateSatellite: UpdateSatellite = async (satellite) => {
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

const deleteSatelliteById: DeleteSatelliteById = async (id) => {
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

const API: SatellitesInterface = {
  getAllSatellites,
  getSatelliteById,
  createSatellite,
  deleteSatelliteById,
  updateSatellite,
};

export default API;
