import React, {useId} from 'react';
import s from './ProfileContacts.module.scss'
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";


export const ProfileContacts = () => {

  const contacts = useAppSelector(state => state.profile.profile.contacts);
  const keyId = useId();
  return (
    <>
      <h3>Contacts:</h3>
      {contacts && Object.entries(contacts).map(([key, value], index) => {
        return (
          <div key={`${keyId}-${index.toString()}`} className={s.contactBlock}>
            <div>{key}:</div>
            <div>{value ? value : "https://social-network.samuraijs.com"}</div>
          </div>
        )
      })}
    </>
  );
};
