import React from 'react';
import s from './MessageLink.module.scss'
import {Link} from "react-router-dom";

export const MessageLink = ({title}: { title: string }) => {
  return <Link to={'/dialogs'} className={s.link}>{title}</Link>
};
