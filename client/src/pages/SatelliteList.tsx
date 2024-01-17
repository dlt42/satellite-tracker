import { useContext } from 'react';

import Breadcrumbs from '../components/BreadCrumb';
import SatelliteListRow from '../components/SatelliteListRow';
import { SatelliteContext } from '../context/SatelliteContext';
import { Satellite } from '../domain/satellite.types';

const SatelliteListHeader = ({ items }: { items: string[] }) => (
  <>
    {items.map((item, index) => (
      <label key={index} className='border-b border-solid border-gray-800 p-1'>
        {item}
      </label>
    ))}
  </>
);

const SatelliteList = () => {
  const { satellites } = useContext(SatelliteContext);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Satellites', link: '/' }]} />
      <div className='grid w-full grid-cols-[repeat(5,1fr)]'>
        <SatelliteListHeader items={['#', 'Name', 'Lat', 'Long', 'Owner']} />
        {satellites.map((satellite: Satellite) => (
          <SatelliteListRow satellite={satellite} key={`${satellite.id}`} />
        ))}
      </div>
      {!satellites.length && <span>No Satellites</span>}
    </>
  );
};

export default SatelliteList;
