import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserInfo
} from '../../modules/auth';

export const HomePage = () => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <section className="section home">
      <h1>Привет, {userInfo?.name || 'Гость'}</h1>
    </section>
  )
}