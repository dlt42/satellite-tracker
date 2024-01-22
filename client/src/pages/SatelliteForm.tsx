import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '../components/BreadCrumb';
import Submit from '../components/Submit';
import { SatelliteContext } from '../context/SatelliteContext';
import { NewSatellite, Satellite } from '../domain/satellite.types';

const SatelliteForm = () => {
  const { id } = useParams();
  console.log(`Satellite Form: ${id ? id : 'new'}`);
  const navigate = useNavigate();

  const [initialValue, setInitialValue] = useState<Satellite>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSatellite>({
    values: initialValue,
  });

  const { addSatellite, getSatellite, updateSatellite } =
    useContext(SatelliteContext);

  const add = useCallback(
    async (data: NewSatellite) => {
      try {
        console.log(data);
        if (data.name === undefined) {
          return;
        }
        const result = await addSatellite(data);
        if (result.isOk) {
          navigate(`/${result.value.id}`);
        }
      } catch (error) {
        console.error('Error', error);
      }
    },
    [addSatellite, navigate]
  );

  const update = useCallback(
    async (data: Satellite) => {
      try {
        const result = await updateSatellite(data);
        if (result.isOk) {
          navigate(`/${id}`);
        }
      } catch (error) {
        console.error('Error', error);
      }
    },
    [id, navigate, updateSatellite]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        if (id && !Number.isNaN(Number.parseInt(id))) {
          const result = await getSatellite(Number.parseInt(id));
          if (result.isErr) throw result.error;
          setInitialValue(result.value);
        }
      } catch (error) {
        console.error('Error fetching satellites:', error);
      }
    }

    fetchData();
  }, [getSatellite, id]);

  let state = '';
  if (id && Number.isNaN(Number.parseInt(id))) {
    state = 'INVALID_ID';
  } else if (id && !initialValue) {
    state = 'LOADING';
  } else {
    state = 'OK';
  }
  return (
    <>
      <Breadcrumbs
        items={
          id
            ? [
                { label: 'Satellites', link: '/' },
                { label: `${id}`, link: `/${id}` },
                { label: `Edit`, link: `/${id}/edit` },
              ]
            : [
                { label: 'Satellites', link: '/' },
                { label: 'New', link: '/new' },
              ]
        }
      />
      {state === 'INVALID_ID' && <div className='p-1'>Invalid ID</div>}
      {state === 'LOADING' && <div className='p-1'>Loading...</div>}
      {state === 'OK' && (
        <form
          className='contents'
          autoComplete='off'
          onSubmit={handleSubmit((data) =>
            id ? update({ id: parseInt(id), ...data }) : add(data)
          )}
        >
          <div className='grid w-full grid-cols-[minmax(25%,_1fr)_minmax(75%,_1fr)] justify-center gap-y-2 overflow-y-auto overflow-x-hidden pt-4'>
            <label htmlFor='name' className='font-bold'>
              Name
            </label>
            <div className='flex flex-col'>
              <input
                id='name'
                type='text'
                {...register('name', { required: true })}
              />
              <div role='alert' className='min-h-4 font-bold text-red-500'>
                {errors.name && 'This field is required'}
              </div>
            </div>

            <label htmlFor='owner' className='font-bold'>
              Owner
            </label>
            <div className='flex flex-col'>
              <input
                id='owner'
                autoComplete='off'
                type='text'
                {...register('owner', { required: true })}
              />
              <div role='alert' className='min-h-4 font-bold text-red-500'>
                {errors.owner && 'This field is required'}
              </div>
            </div>

            <label htmlFor='latitude' className='font-bold'>
              Latitude
            </label>
            <div className='flex flex-col'>
              <input
                id='latitude'
                type='number'
                {...register('latitude', { required: true, max: 90, min: -90 })}
              />
              <div role='alert' className='min-h-4 font-bold text-red-500'>
                {errors.latitude &&
                  errors.latitude.type === 'required' &&
                  'This field is required'}
                {errors.latitude &&
                  (errors.latitude.type === 'min' ||
                    errors.latitude.type === 'max') &&
                  'Value must be between -90 and 90'}
              </div>
            </div>

            <label htmlFor='longitude' className='font-bold'>
              Longitude
            </label>
            <div className='flex flex-col'>
              <input
                id='longitude'
                type='number'
                {...register('longitude', {
                  required: true,
                  max: 180,
                  min: -180,
                })}
              />
              <div role='alert' className='min-h-4 font-bold text-red-500'>
                {errors.longitude &&
                  errors.longitude.type === 'required' &&
                  'This field is required'}
                {errors.longitude &&
                  (errors.longitude.type === 'min' ||
                    errors.longitude.type === 'max') &&
                  'Value must be between -180 and 180'}
              </div>
            </div>
          </div>
          <div className='flex w-full justify-center gap-1'>
            <Submit title={id ? 'Update' : 'Add'} />
          </div>
        </form>
      )}
    </>
  );
};

export default SatelliteForm;
