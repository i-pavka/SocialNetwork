import React from 'react';
import s from './App.module.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Main} from "./Main/Main";
import {store} from "../m2-bll/store";

export const App = () => {
  return (
    <div className={s.appWrapper}>
      <Provider store={store}>
        <HashRouter>
          <Main/>
        </HashRouter>
      </Provider>
    </div>
  );
}

