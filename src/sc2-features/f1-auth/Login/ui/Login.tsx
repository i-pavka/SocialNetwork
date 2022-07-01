import React from 'react';
import s from './Login.module.scss';
import {LoginForm} from "./LoginForm/LoginForm";

export const Login = () => {

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
