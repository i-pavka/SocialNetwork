import React from 'react';
import {Header} from "../../../sc2-features/f3-header/ui/Header";
import {SelfRouter} from "./routes/SelfRouterы";
import {Navbar} from "../../../sc2-features/f4-navbar/ui/Navbar";
import s from './Main.module.scss'

export const Main = () => {
  return (
    <>
      <Header/>
      <div className={s.mainContainer}>
        <aside>
          <Navbar/>
        </aside>
        <SelfRouter/>
      </div>
    </>
  );
};
