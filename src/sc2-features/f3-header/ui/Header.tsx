import React from 'react';
import s from './Header.module.scss';
import {ReactComponent as DefaultAva} from '../../../assets/img/robot_ava.svg';
import {NavLink} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/routes/SelfRouterы";
import logoIcon from '../../../assets/img/mongo.png';

export const Header = () => {

  return (
    <header className={s.headerMain}>
      <div className={s.container}>
        <div className={s.headerContent}>
          <div className={s.logoHeader}>
            <img src={logoIcon} className={s.imgHeader}/>
            <span>Mongo Network</span>
          </div>
          <div className={s.userBlock}>
            <div className={s.userAva}>
              <DefaultAva className={s.defaultAva}/>
              <span>User Name</span>
            </div>
            <button>LogOut</button>
          </div>
        </div>
      </div>
    </header>
  );
};
