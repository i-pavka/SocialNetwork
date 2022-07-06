import React from 'react';
import s from './Dialogs.module.scss';
import { FcVoicePresentation } from "react-icons/fc";

export const Dialogs = () => {

  return (
    <div className={s.dialogsMain}>
      <h1>Dialogs</h1>
      <FcVoicePresentation className={s.iconStyle}/>
    </div>
  );
};
