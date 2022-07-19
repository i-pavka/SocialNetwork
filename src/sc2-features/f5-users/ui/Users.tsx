import React from 'react';
import s from './Users.module.scss';
import { SiProbot } from "react-icons/si";
import {NavLink} from "react-router-dom";


export const Users = () => {
  return (
    <div className={s.usersMain}>
      <h1>Users</h1>
      <SiProbot className={s.iconStyle}/>
      <p>
        <NavLink to={`/profile/2`}>USER_2</NavLink>
      </p>
      <p>
        <NavLink to={`/profile/22`}>USER_22</NavLink>
      </p>
      <p>
        <NavLink to={`/profile/25`}>USER_25</NavLink>
      </p>
      <p>
        <NavLink to={`/profile/15`}>USER_15</NavLink>
      </p>
      <p>
        <NavLink to={`/profile/23216`}>USER_23216</NavLink>
      </p>
    </div>
  );
};
