import React from 'react';
import s from './App.module.css';
import {HashRouter} from "react-router-dom";
import {Main} from "./Main/Main";

export const App = () => {
  return (
    <div className={s.appMainBlock}>
      <HashRouter>
        <Main/>
      </HashRouter>
    </div>
  );
}

