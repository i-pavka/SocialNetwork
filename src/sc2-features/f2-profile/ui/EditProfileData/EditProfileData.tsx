import React, {useId} from 'react';
import s from './EditProfileData.module.scss'
import {InputText} from "../../../../sc1-main/m1-ui/common/components/InputText/InputText";
import {Button} from "../../../../sc1-main/m1-ui/common/components/Button/Button";
import {CheckBox} from "../../../../sc1-main/m1-ui/common/components/CheckBox/CheckBox";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {useFormik} from "formik";
import {setProfileDataTC} from "../../bll/profileReducer";


export const EditProfileData: React.FC<EditProfileDataPropsType> = ({setIsEditData}) => {

  const dispatch = useAppDispatch();
  const keyId = useId();

  const contacts = useAppSelector(state => state.profile.profile.contacts);
  const {formError, isLoadingProfile} = useAppSelector(state => state.profile);
  const {
    facebook, website, vk, github,
    twitter, youtube, mainLink, instagram
  } = useAppSelector(state => state.profile.profile.contacts);
  const {
    fullName, aboutMe,
    lookingForAJob, lookingForAJobDescription
  } = useAppSelector(state => state.profile.profile);

  const formik = useFormik({

    initialValues: {
      fullName: fullName,
      aboutMe: aboutMe ? aboutMe : '',
      lookingForAJob: lookingForAJob,
      lookingForAJobDescription: lookingForAJobDescription ? lookingForAJobDescription : '',
      contacts: {
        facebook: facebook ? facebook : '',
        website: website ? website : '',
        vk: vk ? vk : '',
        twitter: twitter ? twitter : '',
        instagram: instagram ? instagram : '',
        youtube: youtube ? youtube : '',
        github: github ? github : '',
        mainLink: mainLink ? mainLink : '',
      }
    },
    onSubmit: values => {
      dispatch(setProfileDataTC(values));
    },
  })

  return (
    <div className={s.mainEditProfileData}>

      <form onSubmit={formik.handleSubmit}>
        <div className={s.dataItem}>
          <span>Full name:</span>
          <InputText {...formik.getFieldProps('fullName')}/>
          {formError.fullName && <span className={s.errorSpan}>{formError.fullName}</span>}
        </div>
        <div className={s.dataItem}>
          <span>About Me:</span>
          <textarea
            className={s.moduleTextarea}
            {...formik.getFieldProps('aboutMe')}/>
          {formError.aboutMe && <span className={s.errorSpan}>{formError.aboutMe}</span>}
        </div>
        <div className={s.dataItem}>
          <span>Skills:</span>
          <textarea
            className={s.moduleTextarea}
            {...formik.getFieldProps('lookingForAJobDescription')}/>
          {formError.lookingForAJobDescription &&
            <span className={s.errorSpan}>{formError.lookingForAJobDescription}</span>}
        </div>
        <div className={s.dataItem}>
          <CheckBox {...formik.getFieldProps('lookingForAJob')}
                    checked={formik.values.lookingForAJob}>
            Looking for a job?</CheckBox>
        </div>
        <div>
          <h4 className={s.moduleTitle}>Contact</h4>
          {contacts && Object.entries(contacts).map((el, index) => {
            return (
              <div key={`${keyId}-${index.toString()}`} className={s.dataItem}>
                <span>{el[0]}:</span>
                <InputText {...formik.getFieldProps(`contacts.${el[0]}`)}/>
                {formError[el[0]] && <span className={s.errorSpan}>{formError[el[0]]}</span>}
              </div>
            )
          })}
        </div>
        <div style={{display: 'grid'}}>
          <Button type={'submit'} isSpinner={isLoadingProfile}>Save</Button>
        </div>
      </form>
      <Button onClick={() => setIsEditData(false)}
              isSpinner={isLoadingProfile}
              color={'delete'}
      >Cancel</Button>
    </div>
  );
};

// type
export type EditProfileFormType = {
  fullName: string
  aboutMe: string
  lookingForAJobDescription: string
  lookingForAJob: boolean
  contacts: {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
  }
}
type EditProfileDataPropsType = {
  setIsEditData: (value: boolean) => void
}





