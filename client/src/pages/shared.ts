import { ChangeEvent } from 'react';

export const validateLongitude = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  if (value === '') {
    return '0';
  }
  if (Number.parseFloat(e.target.value) > 180) {
    value = '180';
  }
  if (Number.parseFloat(e.target.value) < -180) {
    value = '-180';
  }
  e.target.value = value;
  return value;
};

export const validateLatitude = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  if (value === '') {
    return '0';
  }
  if (Number.parseFloat(e.target.value) > 90) {
    value = '90';
  }
  if (Number.parseFloat(e.target.value) < -90) {
    value = '-90';
  }
  e.target.value = value;
  return value;
};
