import {
  createContext,
  Dispatch,
  JSX,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Result } from 'true-myth';

import API from '../api/api';
import DB from '../db/db';
import { ResponseDataType } from '../domain/domain.types';
import { NewSatellite, Satellite, Satellites } from '../domain/satellite.types';

type SatelliteContextType = {
  satellites: Satellites;
  highlightedSatellite: Satellite | null;
  highlightSatellite: (satellite: Satellite | null) => void;
  getSatellites: () => Promise<ContextResponse<Satellites>>;
  getSatellite: (id: number) => Promise<ContextResponse<Satellite>>;
  updateSatellite: (satellite: Satellite) => Promise<ContextResponse<{}>>;
  removeSatellite: (id: number) => Promise<ContextResponse<{}>>;
  addSatellite: (
    satellite: NewSatellite
  ) => Promise<ContextResponse<Satellite>>;
  setHighlightedSatellite: Dispatch<SetStateAction<Satellite | null>>;
};

export type ContextResponse<T extends ResponseDataType> = Result<T, string>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SatelliteContext = createContext<SatelliteContextType>(null!);

export const SatelliteListProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [satellites, setSatellites] = useState<Satellites>([] as Satellites);

  const [highlightedSatellite, setHighlightedSatellite] =
    useState<Satellite | null>(null);

  const highlightSatellite = (satellite: Satellite | null) => {
    setHighlightedSatellite(satellite);
  };

  const getSource = () => {
    const useApi = false;
    return useApi ? API : DB;
  };

  const getSatellite = async (
    id: number
  ): Promise<ContextResponse<Satellite>> => {
    const foundSatellite = satellites.find((satellite) => satellite.id === id);
    if (foundSatellite) return Result.ok(foundSatellite);

    const result = await getSource().getSatelliteById(id);

    if (result.isOk) {
      const loadedSatellite = result.value.data;
      satellites.push(loadedSatellite);
      return Result.ok(loadedSatellite);
    }

    return Result.err(result.error.error);
  };

  const getSatellites = useCallback(async (): Promise<
    ContextResponse<Satellites>
  > => {
    if (satellites.length > 0) {
      return Result.ok(satellites);
    }

    const result = await getSource().getAllSatellites();

    if (result.isOk) {
      const loadedSatellites = result.value.data;
      setSatellites(loadedSatellites);
      return Result.ok(loadedSatellites);
    }

    return Result.err(result.error.error);
  }, [satellites]);

  useEffect(() => {
    const run = () => {
      getSatellites();
    };
    run();
  }, []);

  const updateSatellite = async (
    satellite: Satellite
  ): Promise<ContextResponse<{}>> => {
    const result = await getSource().updateSatellite(satellite);

    if (result.isOk) {
      const revisedList = satellites.reduce((list, current) => {
        return [...list, current.id === satellite.id ? satellite : current];
      }, [] as Satellites);
      setSatellites(revisedList);
      return Result.ok({});
    }

    return Result.err(result.error.error);
  };

  const addSatellite = async (
    satellite: NewSatellite
  ): Promise<ContextResponse<Satellite>> => {
    const result = await getSource().createSatellite(satellite);

    if (result.isOk) {
      const addedSatellite = result.value.data;
      setSatellites([...satellites, addedSatellite]);
      return Result.ok(addedSatellite);
    }

    return Result.err(result.error.error);
  };

  const removeSatellite = async (id: number): Promise<ContextResponse<{}>> => {
    const result = await getSource().deleteSatelliteById(id);

    if (result.isOk) {
      const revisedList = satellites.filter((satellite) => satellite.id !== id);
      setSatellites(revisedList);
      return Result.ok({});
    }

    return Result.err(result.error.error);
  };

  return (
    <SatelliteContext.Provider
      value={{
        satellites,
        highlightedSatellite,
        highlightSatellite,
        getSatellites,
        getSatellite,
        updateSatellite,
        removeSatellite,
        addSatellite,
        setHighlightedSatellite,
      }}
    >
      {children}
    </SatelliteContext.Provider>
  );
};
