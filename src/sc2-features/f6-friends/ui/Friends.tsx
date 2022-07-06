import React from 'react';
import s from './Friends.module.scss';
import {FaUserFriends} from "react-icons/fa";


export const Friends = () => {
  return (
    <div className={s.friendsMain}>
      <h1>Friends</h1>
      <FaUserFriends className={s.iconStyle}/>
    </div>
  );
};
