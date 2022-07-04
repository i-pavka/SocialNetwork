import React from 'react';
import s from './Users.module.scss';
import { SiProbot } from "react-icons/si";


export const Users = () => {
  return (
    <div className={s.usersMain}>
      <h1>Users</h1>
      <SiProbot className={s.iconStyle}/>
    </div>
  );
};
