import React from 'react';
import s from './Header.module.scss';
import logoIcon from '../../../assets/img/mongo.png';
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {authLogOutTC} from "../../f1-auth/Login/bll/authReducer";
import {useNavigate} from "react-router-dom";
import defaultAva from "../../../assets/img/small_ava.jpg";

export const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {login} = useAppSelector(state => state.auth.authData);
  const {isAuth} = useAppSelector(state => state.auth);
  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const smallAva = useAppSelector(state => state.profile.profile.photos?.small);

  const logOutHandler = () => {
    dispatch(authLogOutTC());
  }
  const logInHandler = () => {
    navigate('/login');
  }

  return (
    <header className={s.headerMain}>
      <div className={s.container}>
        <div className={s.headerContent}>
          <div className={s.logoHeader} onClick={() => {
            navigate('/')
          }}>
            <img src={logoIcon} className={s.imgHeader} alt='network_logo'/>
            <span>Mongo Network</span>
          </div>
          <div className={s.userBlock}>
            <div className={s.userAva}>
              {isAuth && <img className={s.defaultAva} src={smallAva ? smallAva : defaultAva} alt="small-ava"/>}
              {!isAuth && <img className={s.defaultAva} src={defaultAva} alt="small-ava"/>}
              <span>{login ? login : 'Anonymous'}</span>
            </div>
            {login && <Button isSpinner={isLoading} onClick={logOutHandler}>LogOut</Button>}
            {!login && <Button isSpinner={isLoading} onClick={logInHandler}>Login</Button>}
          </div>
        </div>
      </div>
    </header>
  );
};
