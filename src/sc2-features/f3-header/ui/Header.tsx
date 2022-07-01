import React from 'react';
import s from './Header.module.scss';
import {ReactComponent as DefaultAva} from '../../../assets/img/robot_ava.svg';
import logoIcon from '../../../assets/img/mongo.png';
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";

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
            <Button>LogOut</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
