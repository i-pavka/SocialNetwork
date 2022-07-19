import React, {useEffect, useState} from 'react';
import s from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {getProfileDataTC, getProfileStatusTC} from "../bll/profileReducer";
import {useParams} from "react-router-dom";
import {AvatarBlock} from "./AvatarBlock/AvatarBlock";
import {ProfileContacts} from "./ProfileContacts/ProfileContacts";
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import {EditProfileData} from "./EditProfileData/EditProfileData";

export const Profile = () => {

  const urlParams = useParams<'id'>();
  const urlUserID = urlParams.id;

  const dispatch = useAppDispatch();
  const {
    lookingForAJob,
    aboutMe, lookingForAJobDescription
  } = useAppSelector(state => state.profile.profile);
  const {isAuth, userID} = useAppSelector(state => state.auth);
  const isLoading = useAppSelector(state => state.app.appIsLoading);

  const [isEditData, setIsEditData] = useState(false)

  useEffect(() => {
    dispatch(getProfileDataTC(urlUserID));
    dispatch(getProfileStatusTC(urlUserID));
  }, [dispatch, urlUserID, isAuth]);


  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <div className={s.profileMain}>
      <div className={s.mainItem}>
        <AvatarBlock urlID={urlUserID as string}/>
        <div className={s.infoBlock}>
          <div className={s.aboutMe}>
            {aboutMe && <h3>{aboutMe}</h3>}
            <div>
              <h4>{lookingForAJob ? 'Ищу работу' : 'Уже работаю'}</h4>
              <h4>{lookingForAJobDescription}</h4>
            </div>
          </div>
          <ProfileContacts/>
          {urlUserID === String(userID)
            && <Button onClick={() => {setIsEditData(!isEditData)}}>
              {isEditData ? 'Close' : 'Edit Profile Dta'}
          </Button>}
        </div>
      </div>
      {isEditData && <EditProfileData setIsEditData={setIsEditData}/>}
    </div>
  );
};
