import React from 'react';
import s from './Profile.module.scss';
import {useAppSelector} from "../../../sc1-main/m2-bll/store";
import {DataAuthType} from "../../f1-auth/Login/bll/authReducer";

export const Profile = () => {

  const {login} = useAppSelector<DataAuthType>(state => state.auth.authData);

  return (
    <div className={s.profileMain}>
      <h1>Profile</h1>
      <h1>{login}</h1>
    </div>
  );
};
