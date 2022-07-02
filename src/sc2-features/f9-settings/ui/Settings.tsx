import React from 'react';
import s from './Settings.module.scss';
import {BsGear} from "react-icons/bs";

export const Settings = () => {
  return (
    <div className={s.settingsMain}>
      <h1>Settings</h1>
      <BsGear className={s.iconStyle}/>
    </div>
  );
};
