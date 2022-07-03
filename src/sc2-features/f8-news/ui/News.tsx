import React from 'react';
import s from './News.module.scss';
import { FaPoo, FaToiletPaperSlash } from "react-icons/fa";


export const News = () => {
  return (
    <div className={s.newsMain}>
      <h1>News</h1>
      <FaPoo className={s.iconStylePoo}/>
      <FaToiletPaperSlash className={s.iconStylePaper}/>
    </div>
  );
};
