import React, {useEffect} from 'react';
import s from './Profile.module.scss';
import {useAppSelector} from "../../../sc1-main/m2-bll/store";
import {DataAuthType} from "../../f1-auth/Login/bll/authReducer";
import {useNavigate} from "react-router-dom";

export const Profile = () => {

  const {login} = useAppSelector<DataAuthType>(state => state.auth.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) navigate('/login');
  }, [login, navigate]);

  return (
    <div className={s.profileMain}>
      <h1>Profile</h1>
      <h1>{login}</h1>
    </div>
  );
};
