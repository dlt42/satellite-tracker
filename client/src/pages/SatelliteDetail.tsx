import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '../components/BreadCrumb';
import Button from '../components/Button';
import { SatelliteContext } from '../context/SatelliteContext';
import { Satellite } from '../domain/satellite.types';

const SatelliteDetail = () => {
  const { id } = useParams();
  const [sat, setSat] = useState<Satellite | null>(null);

  const { removeSatellite, getSatellite } = useContext(SatelliteContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!sat && id && !Number.isNaN(Number.parseInt(id))) {
          const result = await getSatellite(Number.parseInt(id));
          if (result.isErr) throw result.error;
          setSat(result.value);
        }
      } catch (error) {
        console.error('Error fetching satellites:', error);
      }
    }

    fetchData();
  }, [getSatellite, id, sat]);

  async function deleteSatellite() {
    try {
      if (!id) return;
      const result = await removeSatellite(Number.parseInt(id));
      if (result.isErr) throw result.error;
      navigate('/');
    } catch (error) {
      console.error('Error fetching satellites:', error);
    }
  }

  let state = '';
  if (id && Number.isNaN(Number.parseInt(id))) {
    state = 'INVALID_ID';
  } else if (id && !sat) {
    state = 'LOADING';
  } else {
    state = 'OK';
  }
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Satellites', link: '/' },
          { label: `${id}`, link: `/${id}` },
        ]}
      />
      {state === 'INVALID_ID' && <div className='p-1'>Invalid ID</div>}
      {state === 'LOADING' && <div className='p-1'>Loading...</div>}
      {state === 'OK' && (
        <>
          <div className='grid w-full grid-cols-[minmax(25%,_1fr)_minmax(75%,_1fr)] justify-center gap-y-2 overflow-y-auto overflow-x-hidden pt-4'>
            <label htmlFor='name' className='font-bold'>
              Name
            </label>
            <div className='flex flex-col pb-4'>{sat?.name}</div>

            <label htmlFor='owner' className='font-bold'>
              Owner
            </label>
            <div className='flex flex-col pb-4'>{sat?.owner}</div>

            <label htmlFor='latitude' className='font-bold'>
              Latitude
            </label>
            <div className='flex flex-col pb-4'>{sat?.latitude}</div>

            <label htmlFor='longitude' className='font-bold'>
              Longitude
            </label>
            <div className='flex flex-col pb-4'>{sat?.longitude}</div>
          </div>
          <div className='flex w-full justify-center gap-1'>
            <Button onClick={() => navigate(`/${id}/edit`)}>Edit</Button>
            <Button onClick={() => deleteSatellite()}>Del</Button>
          </div>
        </>
      )}
    </>
  );
};

export default SatelliteDetail;
