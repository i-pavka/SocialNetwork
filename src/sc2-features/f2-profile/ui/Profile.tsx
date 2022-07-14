import React, {useEffect, useId, useState} from 'react';
import s from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {changeProfileStatusTC, getProfileDataTC, getProfileStatusTC} from "../bll/profileReducer";
import avaMain from '../../../assets/img/ava_large.jpeg';
import avaSmall from '../../../assets/img/small_ava.jpg';
import {useParams} from "react-router-dom";
import {InputText} from "../../../sc1-main/m1-ui/common/components/InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";

export const Profile = () => {

  const urlParams = useParams<'*'>();
  const urlUserID = urlParams["*"];

  const dispatch = useAppDispatch();
  const {
    fullName,
    lookingForAJob,
    photos, contacts,
    aboutMe, lookingForAJobDescription
  } = useAppSelector(state => state.profile.profile);
  const {status, isLoadingProfile} = useAppSelector(state => state.profile);
  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const keyId = useId();

  const [statusValue, setStatusValue] = useState(status);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    let loadID;
    if (urlUserID && urlUserID !== '*') {
      loadID = urlUserID;
    } else {
      loadID = '';
    }
    dispatch(getProfileDataTC(loadID));
    dispatch(getProfileStatusTC(loadID));
  }, [dispatch, urlUserID]);

  useEffect(() => {
    setStatusValue(status);
  }, [status]);

  const editModeHandler = () => {
    if (status !== statusValue) dispatch(changeProfileStatusTC(statusValue));
    setEditMode(prevState => !prevState);
  }

  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <div className={s.profileMain}>

      <div className={s.avaBlock}>
        <img className={s.largeAva} src={photos?.large ? photos?.large : avaMain} alt="large-ava"/>
        <div className={s.smallAva}>
          <img src={photos?.small ? photos?.small : avaSmall} alt="small-ava"/>
        </div>
        <div className={s.nameBlock}>
          <h1>{fullName}</h1>
          <p>Status:</p>
          <div className={s.statusBlock}>
            <h2>{editMode ? null : status}</h2>
            {editMode ? <InputText value={statusValue} onChangeText={setStatusValue}/> : null}
            <Button onClick={editModeHandler}
                    isSpinner={isLoadingProfile}
                    className={s.buttonChange}>edit</Button>
          </div>
        </div>
      </div>
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
