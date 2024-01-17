import { memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { SatelliteContext } from '../context/SatelliteContext';
import { Satellite } from '../domain/satellite.types';

type SatelliteListRowProps = {
  satellite: Satellite;
};

const SatelliteListRow = memo(({ satellite }: SatelliteListRowProps) => {
  const navigate = useNavigate();
  const { id, latitude, longitude, name, owner } = satellite;
  const { highlightedSatellite, setHighlightedSatellite } =
    useContext(SatelliteContext);
  const props = {
    className: highlightedSatellite?.id === id ? 'bg-gray-400 p-1' : 'p-1',
  };
  return (
    <span
      onClick={() => {
        navigate(`/${id}`);
      }}
      onMouseOver={() => {
        setHighlightedSatellite(satellite);
      }}
      onMouseOut={() => {
        setHighlightedSatellite(null);
      }}
      className='contents cursor-pointer'
    >
      <span {...props}>{id}</span>
      <span {...props}>{name}</span>
      <span {...props}>{latitude}</span>
      <span {...props}>{longitude}</span>
      <span {...props}>{owner}</span>
    </span>
  );
});

export default SatelliteListRow;
