import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Marker } from 'react-simple-maps';

import { ContextResponse, SatelliteContext } from '../context/SatelliteContext';
import { Satellite } from '../domain/satellite.types';
import updatePosition, { Positions } from './Positions';
import SatelliteAnnotation from './SatelliteAnnotation';

export type MapMouseEvent = MouseEvent<SVGPathElement, globalThis.MouseEvent>;

export const SatelliteLayer = () => {
  const { satellites, getSatellite, highlightSatellite, highlightedSatellite } =
    useContext(SatelliteContext);

  /** START POSITION UPDATE **/
  const [positions, setPositions] = useState<Positions>([]);

  const updatePositionsCallbackRef = useRef<() => void>(null!);

  function updatePositionsCallback() {
    setPositions(
      satellites.map((satellite) => updatePosition(satellite, positions))
    );
  }

  useEffect(() => {
    updatePositionsCallbackRef.current = updatePositionsCallback;
  });

  useEffect(() => {
    const tick = () => {
      updatePositionsCallbackRef.current();
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);

  /** END POSITION UPDATE **/

  const onMouseEnter = useCallback(
    async (e: MapMouseEvent) => {
      const id = e.currentTarget.getAttribute('data-satellite-id');
      if (!id) return;
      const result: ContextResponse<Satellite> = await getSatellite(
        parseInt(id)
      );
      if (result.isOk) {
        highlightSatellite(result.value);
      }
    },
    [getSatellite, highlightSatellite]
  );

  const onMouseLeave = useCallback(() => {
    highlightSatellite(null);
  }, [highlightSatellite]);

  return (
    <>
      {positions &&
        positions.map(({ latitude, longitude, id }, index) => {
          return (
            <Marker
              data-satellite-id={id}
              key={`${index}-${id}}`}
              coordinates={[longitude, latitude]}
              {...{ onMouseLeave, onMouseEnter }}
            >
              <circle
                r={id === highlightedSatellite?.id ? 10 : 5}
                fill={id === highlightedSatellite?.id ? '#F53' : '#555'}
              />
            </Marker>
          );
        })}
      {highlightedSatellite && (
        <SatelliteAnnotation
          positions={positions}
          satellite={highlightedSatellite}
        />
      )}
    </>
  );
};
