import React, {useEffect, useId} from 'react';
import s from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {getProfileDataTC, getProfileStatusTC} from "../bll/profileReducer";
import {useParams} from "react-router-dom";
import {AvatarBlock} from "./AvatarBlock/AvatarBlock";

export const Profile = () => {

  const urlParams = useParams<'id'>();
  const urlUserID = urlParams["id"];

  const dispatch = useAppDispatch();
  const {
    lookingForAJob,
    contacts,
    aboutMe, lookingForAJobDescription
  } = useAppSelector(state => state.profile.profile);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const keyId = useId();

  useEffect(() => {
    dispatch(getProfileDataTC(urlUserID));
    dispatch(getProfileStatusTC(urlUserID));
  }, [dispatch, urlUserID, isAuth]);


  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <div className={s.profileMain}>
      <AvatarBlock/>
      <div className={s.infoBlock}>
        <div className={s.aboutMe}>
          <h3>{aboutMe}</h3>
          <div>
            <h4>{lookingForAJob ? 'Ищу работу' : 'Уже работаю'}</h4>
            <h4>{lookingForAJobDescription}</h4>
          </div>

        </div>
        <h3>Contacts:</h3>
        {contacts && Object.entries(contacts).map(([key, value], index) => {
          return (
            <div key={`${keyId}-${index.toString()}`} className={s.contactBlock}>
              <div>{key}:</div>
              <div>{value ? value : "https://social-network.samuraijs.com"}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
