import React, {useId, Fragment} from 'react';
import s from './ProfileContacts.module.scss'
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {InfoHeader} from "../../../../sc1-main/m1-ui/common/components/InfoHeader/InfoHeader";


export const ProfileContacts = () => {

  const contacts = useAppSelector(state => state.profile.profile.contacts);
  const keyId = useId();
  return (
    <div className={s.infoBlock}>
      <InfoHeader title={'Contacts'}/>
      <div className={s.itemsBlock}>
        {contacts && Object.entries(contacts).map(([key, value], index) => {
          return (<Fragment key={`${keyId}-${index.toString()}`}>
            {value && <div className={s.contactItem}>
              <h4 className={s.itemTitle}>{key}:</h4>
              <div className={s.itemLink}>
                <a href={value} target='_blank' rel={key}>{value}</a>
              </div>
            </div>}
          </Fragment>)
        })}
      </div>
    </div>
  );
};
