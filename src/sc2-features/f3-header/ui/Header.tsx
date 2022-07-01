import React from 'react';
import s from './Header.module.scss';
import {ReactComponent as DefaultAva} from '../../../assets/img/robot_ava.svg';
import logoIcon from '../../../assets/img/mongo.png';
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import {useAppSelector} from "../../../sc1-main/m2-bll/store";
import {DataAuthType} from "../../f1-auth/Login/bll/authReducer";

export const Header = () => {

  const {login} = useAppSelector<DataAuthType>(state => state.auth.authData);

  return (
    <header className={s.headerMain}>
      <div className={s.container}>
        <div className={s.headerContent}>
          <div className={s.logoHeader}>
            <img src={logoIcon} className={s.imgHeader} alt='user_logo'/>
            <span>Mongo Network</span>
          </div>
          <div className={s.userBlock}>
            <div className={s.userAva}>
              <DefaultAva className={s.defaultAva}/>
              <span>{login ? login : 'Anonymous'}</span>
            </div>
            <Button>LogOut</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
