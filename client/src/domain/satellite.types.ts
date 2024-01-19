import { z } from 'zod';

import { DomainResponse } from './domain.types';

export const newSatelliteSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  owner: z.string().nullable(),
});

export const satelliteSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  owner: z.string().nullable(),
  id: z.number(),
});

export const satellitesSchema = z.array(satelliteSchema);

export type Satellite = z.infer<typeof satelliteSchema>;

export type NewSatellite = z.infer<typeof newSatelliteSchema>;

export type Satellites = z.infer<typeof satellitesSchema>;

export type GetAllSatellites = () => Promise<DomainResponse<Satellites>>;

export type GetSatelliteById = (
  id: number
) => Promise<DomainResponse<Satellite>>;

export type CreateSatellite = (
  satellite: NewSatellite
) => Promise<DomainResponse<Satellite>>;

export type UpdateSatellite = (
  satellite: Satellite
) => Promise<DomainResponse<Satellite>>;

export type DeleteSatelliteById = (id: number) => Promise<DomainResponse<{}>>;

export type SatellitesInterface = {
  getAllSatellites: GetAllSatellites;
  getSatelliteById: GetSatelliteById;
  createSatellite: CreateSatellite;
  deleteSatelliteById: DeleteSatelliteById;
  updateSatellite: UpdateSatellite;
};
