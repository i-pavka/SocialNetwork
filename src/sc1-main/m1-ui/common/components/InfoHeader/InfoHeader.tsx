import React from 'react';
import s from './InfoHeader.module.scss'

export const InfoHeader = ({title}: { title: string }) => {
  return <h1 className={s.infoHeader}>{title}</h1>
};
