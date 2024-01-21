import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../components/BreadCrumb';
import Button from '../components/Button';
import { SatelliteContext } from '../context/SatelliteContext';
import { NewSatellite } from '../domain/satellite.types';
import { validateLatitude, validateLongitude } from './shared';

const CreateSatelliteForm = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);

  const { addSatellite } = useContext(SatelliteContext);

  async function add() {
    try {
      const newSatellite: NewSatellite = {
        name: nameRef.current?.value || '',
        latitude: Number.parseFloat(latitudeRef.current?.value || '0'),
        longitude: Number.parseFloat(longitudeRef.current?.value || '0'),
        owner: ownerRef.current?.value || '',
      };
      const result = await addSatellite(newSatellite);
      if (result.isOk) {
        navigate(`/${result.value.id}`);
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
          { label: 'New', link: '/new' },
        ]}
      />
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
        <Button onClick={() => add()}>Add</Button>
      </div>
    </>
  );
};

export default CreateSatelliteForm;
