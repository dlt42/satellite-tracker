import { Result } from 'true-myth';

import { DomainError } from '../domain/domain.types';
import {
  CreateSatellite,
  DeleteSatelliteById,
  GetAllSatellites,
  GetSatelliteById,
  NewSatellite,
  Satellite,
  SatellitesInterface,
  UpdateSatellite,
} from '../domain/satellite.types';
import { getErrorMessage } from '../util/shared';
import { Handler } from './db.types';

const callDB = async <T>(
  handler: Handler<T>,
  mode: IDBTransactionMode
): Promise<T | DomainError> => {
  const open = indexedDB.open('data');
  const result = await new Promise<T | DOMException>((resolve, reject) => {
    open.onupgradeneeded = () => {
      const db = open.result;
      if (!db.objectStoreNames.contains('satellites')) {
        db.createObjectStore('satellites', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
    open.onsuccess = () => {
      const db: IDBDatabase = open.result;
      const transaction = db.transaction('satellites', mode);
      const objectStore = transaction.objectStore('satellites');
      handler(objectStore, resolve, reject);
      transaction.oncomplete = () => db.close();
    };
  });
  return result instanceof DOMException
    ? {
        error: getErrorMessage(result),
        causes: [],
      }
    : result;
};

export const getSatelliteById: GetSatelliteById = async (id: number) => {
  const handler: Handler<Satellite> = (objectStore, resolve, reject) => {
    const result = objectStore.get(id);
    result.onerror = () => reject(result.error);
    result.onsuccess = () => resolve(result.result);
  };
  const result = await callDB(handler, 'readonly');
  return result instanceof DomainError
    ? Result.err(result)
    : Result.ok({ data: result });
};

export const getAllSatellites: GetAllSatellites = async () => {
  const handler: Handler<Satellite[]> = (objectStore, resolve, reject) => {
    const result = objectStore.getAll();
    result.onerror = () => reject(result.error);
    result.onsuccess = () => resolve(result.result);
  };
  const result = await callDB(handler, 'readonly');
  return result instanceof DomainError
    ? Result.err(result)
    : Result.ok({ data: result });
};

export const createSatellite: CreateSatellite = async (
  satellite: NewSatellite
) => {
  const handler: Handler<number> = (objectStore, resolve, reject) => {
    const result = objectStore.add(satellite);
    result.onerror = () => reject(result.error);
    result.onsuccess = () =>
      typeof result.result === 'number'
        ? resolve(result.result)
        : reject(new Error('Invalid ID type'));
  };
  const result = await callDB(handler, 'readwrite');
  return result instanceof DomainError
    ? Result.err(result)
    : Result.ok({ data: { ...satellite, id: result } });
};

export const updateSatellite: UpdateSatellite = async (
  satellite: Satellite
) => {
  const handler: Handler<void> = (objectStore, resolve, reject) => {
    const result = objectStore.put(satellite);
    result.onerror = () => reject(result.error);
    result.onsuccess = () => resolve();
  };
  const result = await callDB(handler, 'readwrite');
  return result instanceof DomainError
    ? Result.err(result)
    : Result.ok({ data: satellite });
};

export const deleteSatelliteById: DeleteSatelliteById = async (id: number) => {
  const handler: Handler<void> = (objectStore, resolve, reject) => {
    const result = objectStore.delete(id);
    result.onerror = () => reject(result.error);
    result.onsuccess = () => resolve();
  };
  const result = await callDB(handler, 'readwrite');
  return result instanceof DomainError
    ? Result.err(result)
    : Result.ok({ data: id });
};

const DB: SatellitesInterface = {
  getAllSatellites,
  getSatelliteById,
  createSatellite,
  deleteSatelliteById,
  updateSatellite,
};

export default DB;
