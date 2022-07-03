import React from 'react';
import s from './Login.module.scss';
import {LoginForm} from "./LoginForm/LoginForm";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";


export const Login = () => {

  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth);
  // const {state}: any = useLocation();
  // const from = state?.from?.pathname || "/";

  const location = useLocation();
  const from = JSON.parse(JSON.stringify(location.state))?.from?.state?.from?.pathname || "/";

  if (isAuth) {
    return <Navigate to={from}/>
  }

  return (
    <div className={s.loginMain}>
      <div className={s.loginBlock}>
        <div className={s.infoBlock}>
          <h2>Mongo Network</h2>
          <span>To log in get registered here
             Or use common test account credentials:</span>
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
