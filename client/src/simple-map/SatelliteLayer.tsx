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
  const {
    satellites,
    getSatellite,
    highlightSatellite,
    highlightedSatellite,
    paused,
  } = useContext(SatelliteContext);

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
      if (!paused) {
        updatePositionsCallbackRef.current();
      }
    };
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, [paused]);

  const onMouseDownCapture = useCallback(
    async (e: MapMouseEvent) => {
      const id = e.currentTarget.getAttribute('data-satellite-id');
      console.log('down');
      if (!id) return;
      const result: ContextResponse<Satellite> = await getSatellite(
        parseInt(id)
      );
      if (result.isOk) {
        highlightSatellite(result.value);
      }
      e.stopPropagation();
      e.preventDefault();
      console.log('down');
      return false;
    },
    [getSatellite, highlightSatellite]
  );

  const onClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('up');
    return false;
  }, []);

  return (
    <>
      {positions &&
        positions.map(({ latitude, longitude, id }, index) => {
          return (
            <Marker
              data-satellite-id={id}
              key={`${index}-${id}}`}
              coordinates={[longitude, latitude]}
              {...{
                onClick,
                onMouseDownCapture,
              }}
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
