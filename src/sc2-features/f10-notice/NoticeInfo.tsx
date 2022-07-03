import React from 'react';
import {Link, useLocation} from "react-router-dom";
import s from './NoticeInfo.module.scss'
import { SiMonkeytie } from "react-icons/si";

export const NoticeInfo = () => {

  const location = useLocation();

  return (
    <div className={s.noticeMain}>
      <h2>To see this page, please LogIn</h2>
      <SiMonkeytie className={s.iconStyle}/>
      <Link to={'/login'} className={s.link} state={{from: location}}>LogIn</Link>
    </div>
  );
};
