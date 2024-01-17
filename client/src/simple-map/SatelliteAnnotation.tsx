import { Annotation } from 'react-simple-maps';

import { Satellite } from '../domain/satellite.types';
import { Positions } from './Positions';

const SatelliteAnnotation = ({
  positions,
  satellite,
}: {
  satellite: Satellite;
  positions: Positions;
}) => {
  const position = positions.find((pos) => pos.id === satellite.id);
  if (position) {
    return (
      <Annotation
        subject={[position.longitude, position.latitude]}
        dx={-50}
        dy={0}
        connectorProps={{
          stroke: '#FF5533',
          strokeWidth: 3,
          strokeLinecap: 'round',
        }}
      >
        <foreignObject x='-200' y='-1' width='210' height='210'>
          <div className='w-[200px] overflow-hidden text-nowrap border-[3px] border-red-500 bg-white p-1'>
            {Object.entries({
              ...satellite,
              ...position,
            }).map((current, index) => (
              <div key={index}>{`${current[0]}: ${current[1]}`}</div>
            ))}
          </div>
        </foreignObject>
      </Annotation>
    );
  }
  return <></>;
};

export default SatelliteAnnotation;
