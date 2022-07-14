import React from 'react';
import s from './Login.module.scss';
import {LoginForm} from "./LoginForm/LoginForm";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";

export const Login = () => {

  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth);
  const {state} = useLocation() as { state: { from: { state: { from: { pathname: string } } } } };
  const from = state?.from?.state?.from?.pathname || "/";

  if (isAuth) {
    return <Navigate to={from}/>
  }

  return (
    <div className={s.loginMain}>
      <div className={s.loginBlock}>
        <div className={s.infoBlock}>
          <h2>Mongo Network</h2>
          <p>To log in get registered
            <a href="https://social-network.samuraijs.com/signUp" target='_blank'>here</a>
          </p>
          <p>Or use common test account credentials</p>
          <div className={s.loginData}>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </div>
        </div>
        <h2>Login</h2>
        <LoginForm/>
      </div>
    </div>
  );
};
