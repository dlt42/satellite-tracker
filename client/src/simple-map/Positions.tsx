import LatLon from 'geodesy/latlon-nvector-spherical';

import { Satellite } from '../domain/satellite.types';

export type Position = Pick<Satellite, 'id' | 'latitude' | 'longitude'> & {
  bearing: number;
  speed: number;
  originalLatitude: number;
  originalLongitude: number;
};

export type Positions = Position[];

const updatePosition = (satellite: Satellite, positions: Positions) => {
  const { id, latitude: satLatitude, longitude: satLongitide } = satellite;

  const position = positions.find((pos) => pos.id === id);
  if (position) {
    const { originalLatitude, originalLongitude } = position;
    if (
      originalLatitude !== satLatitude ||
      originalLongitude !== satLongitide
    ) {
      position.originalLongitude = satLongitide;
      position.originalLatitude = satLatitude;
      position.latitude = satLatitude;
      position.longitude = satLongitide;
    } else {
      const { latitude, longitude, bearing, speed } = position;

      const p1 = new LatLon(latitude, longitude);
      const p2: LatLon = p1.destinationPoint(speed * 1000, bearing);
      const newBearing = p1.finalBearingTo(p2);
      if (p2) {
        position.latitude = p2.latitude;
        position.longitude = p2.longitude;
        position.bearing = newBearing;
      }
    }
    return position;
  }
  return {
    id,
    latitude: satLatitude,
    longitude: satLongitide,
    originalLongitude: satLatitude,
    originalLatitude: satLongitide,
    bearing: Math.random() * 360,
    speed: Math.random() * 150 + 50,
  };
};

export default updatePosition;
