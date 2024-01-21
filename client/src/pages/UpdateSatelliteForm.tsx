import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '../components/BreadCrumb';
import Button from '../components/Button';
import { SatelliteContext } from '../context/SatelliteContext';
import { validateLatitude, validateLongitude } from './shared';

const UpdateSatelliteForm = React.memo(() => {
  const { id } = useParams();

  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);

  const { getSatellite, updateSatellite } = useContext(SatelliteContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const result = await getSatellite(Number.parseInt(id));
          if (result.isOk) {
            if (nameRef.current) nameRef.current.value = result.value.name;
            if (latitudeRef.current)
              latitudeRef.current.value = result.value.latitude.toString();
            if (longitudeRef.current)
              longitudeRef.current.value = result.value.longitude.toString();
            if (ownerRef.current)
              ownerRef.current.value = result.value.owner || '';
          }
          if (result.isErr) throw result.error;
        }
      } catch (error) {
        console.error('Error fetching satellites:', error);
      }
    }

    fetchData();
  }, [getSatellite, id]);

  if (id && Number.isNaN(Number.parseInt(id))) {
    return <div className='p-1'>Invalid ID</div>;
  }

  async function update() {
    try {
      if (id) {
        const result = await updateSatellite({
          id: parseInt(id),
          name: nameRef.current?.value || '',
          latitude: Number.parseFloat(latitudeRef.current?.value || '0'),
          longitude: Number.parseFloat(longitudeRef.current?.value || '0'),
          owner: ownerRef.current?.value || '',
        });
        if (result.isOk) {
          navigate(`/${id}`);
        }
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Satellites', link: '/' },
          { label: `${id}`, link: `/${id}` },
          { label: `Edit`, link: `/${id}/edit` },
        ]}
      />
      <>
        <div className='grid w-full grid-cols-4 justify-center gap-1 overflow-y-auto overflow-x-hidden'>
          <label htmlFor='name'>Name</label>
          <input
            ref={nameRef}
            type='text'
            id='name'
            aria-describedby='nameHelp'
          />

          <label htmlFor='owner'>Owner</label>
          <input ref={ownerRef} type='text' id='owner' />

          <label htmlFor='latitude'>Latitude</label>
          <input
            ref={latitudeRef}
            type='number'
            id='latitude'
            onBlur={validateLatitude}
            max={90}
            min={-90}
          />

          <label htmlFor='longitude'>Longitude</label>
          <input
            ref={longitudeRef}
            type='number'
            id='longitude'
            onBlur={validateLongitude}
            max={180}
            min={-180}
          />
        </div>
        <div className='flex w-full justify-center gap-1 border-t border-t-black pt-1'>
          <Button onClick={() => update()}>Update</Button>
        </div>
      </>
    </>
  );
});

export default UpdateSatelliteForm;
