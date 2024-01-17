import { z } from 'zod';

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
