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
        if (!sat && id) {
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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Satellites', link: '/' },
          { label: `${id}`, link: `/${id}` },
        ]}
      />
      {!sat ? (
        <div>No satellite selected</div>
      ) : (
        <>
          <div className='grid w-full rid grid-cols-4 justify-center gap-1 overflow-y-auto overflow-x-hidden'>
            <label htmlFor='name'>Name</label>
            <span id='name'>{sat.name}</span>
            <label htmlFor='owner'>Owner</label>
            <span id='owner'>{sat.owner}</span>
            <label htmlFor='Latitude'>Latitude</label>
            <span id='Latitude'>{sat.latitude}</span>
            <label htmlFor='longitude'>Longitude</label>
            <span id='longitude'>{sat.longitude}</span>
          </div>
          <div className='flex w-full justify-center gap-1 border-t border-t-black pt-1'>
            <Button onClick={() => navigate(`/${id}/edit`)}>Edit</Button>
            <Button onClick={() => deleteSatellite()}>Del</Button>
          </div>
        </>
      )}
    </>
  );
};

export default SatelliteDetail;
