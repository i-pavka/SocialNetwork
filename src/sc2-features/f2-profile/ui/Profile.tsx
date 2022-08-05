import React, {useEffect, useState} from 'react';
import s from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {getIsFollowingProfileTC, getProfileDataTC, getProfileStatusTC} from "../bll/profileReducer";
import {useParams} from "react-router-dom";
import {AvatarBlock} from "./AvatarBlock/AvatarBlock";
import {ProfileContacts} from "./ProfileContacts/ProfileContacts";
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import {EditProfileData} from "./EditProfileData/EditProfileData";
import {InfoHeader} from "../../../sc1-main/m1-ui/common/components/InfoHeader/InfoHeader";
import {FollowUnfollow} from "../../../sc1-main/m1-ui/common/components/FollowUnfollow/FollowUnfollow";
import {MessageLink} from "../../../sc1-main/m1-ui/common/components/MessageLink/MessageLink";

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
  const isFollow = useAppSelector(state => state.profile.isProfileFollowing);

  const [isEditData, setIsEditData] = useState(false)

  useEffect(() => {
    dispatch(getProfileDataTC(urlUserID));
    dispatch(getProfileStatusTC(urlUserID));
    isAuth && dispatch(getIsFollowingProfileTC(Number(urlUserID)));
  }, [dispatch, urlUserID, isAuth]);

  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <div className={s.profileMain}>
      <div className={s.mainItem}>

        <AvatarBlock urlID={urlUserID as string}/>
        <div className={s.infoBlock}>
          <div className={s.infoBlockItem}>
            <InfoHeader title={'About Me'}/>
            {aboutMe && <h3>{aboutMe}</h3>}
          </div>
          <div className={s.infoBlockItem}>
            <InfoHeader title={'Work'}/>
            <h4>{lookingForAJob ? 'Ищу работу' : 'Уже работаю'}</h4>
          </div>
          <div className={s.infoBlockItem}>
            <InfoHeader title={'Work Description'}/>
            <h4>{lookingForAJobDescription}</h4>
          </div>
          <ProfileContacts/>
          {((urlUserID !== String(userID)) && isAuth)
            && <div className={s.friendUserActions}>
              <FollowUnfollow userId={Number(urlUserID)}
                              followed={isFollow}/>
              <MessageLink title={'Write Message'}/>
            </div>
          }
        </div>
      </div>
      {urlUserID === String(userID)
        && <div className={s.editBlock}>
          <Button className={s.buttonEdit} onClick={() => setIsEditData(!isEditData)}>
            {isEditData ? 'Close' : 'Edit Profile Dta'}
          </Button>
        </div>}
      {isEditData && <EditProfileData setIsEditData={setIsEditData}/>}
    </div>
  );
};
