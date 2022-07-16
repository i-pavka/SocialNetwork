import React, {useEffect, useRef, useState} from 'react';
import s from "./AvatarBlock.module.scss";
import {InputFile} from "../InputFile/InputFile";
import avaMain from "../../../../assets/img/ava_large.jpeg";
import avaSmall from "../../../../assets/img/small_ava.jpg";
import {ReactComponent as UploadAva} from "../../../../assets/img/add_photo.svg";
import {Button} from "../../../../sc1-main/m1-ui/common/components/Button/Button";
import {InputText} from "../../../../sc1-main/m1-ui/common/components/InputText/InputText";
import {changeProfileStatusTC, setProfilePhotoTC} from "../../bll/profileReducer";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";


export const AvatarBlock = () => {

  const dispatch = useAppDispatch();
  const {status, isLoadingProfile} = useAppSelector(state => state.profile);
  const {fullName, photos} = useAppSelector(state => state.profile.profile);

  const inputRef = useRef<HTMLInputElement>(null);
  const [statusValue, setStatusValue] = useState(status);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [newPhoto, setNewPhoto] = useState('');
  const [fileData, setFileData] = useState<FormData>();
  const [changeMode, setChangeMode] = useState(false);

  useEffect(() => {
    setStatusValue(status);
  }, [status]);

  const editModeHandler = () => {
    if (status !== statusValue) dispatch(changeProfileStatusTC(statusValue));
    setEditMode(prevState => !prevState);
  }
  const uploadHandler = () => {
    setChangeMode(true);
    inputRef && inputRef.current && inputRef.current.click();
  }
  const savaHandler = () => {
    fileData && dispatch(setProfilePhotoTC(fileData));
    !isLoadingProfile && setChangeMode(false);
  }
  const cancelHandler = () => {
    setNewPhoto('');
    setChangeMode(false);
  }

  return (
    <div className={s.avaBlock}>
      <InputFile error={error}
                 setError={setError}
                 setNewPhoto={setNewPhoto}
                 setFileData={setFileData}
                 inputRef={inputRef}/>
      <img className={s.largeAva} src={newPhoto ? newPhoto : photos?.large ? photos?.large : avaMain} alt="large-ava"/>
      <div className={s.smallAva}>
        <img src={newPhoto ? newPhoto : photos?.small ? photos?.small : avaSmall} alt="small-ava"/>
        <UploadAva className={s.editPhoto}
                   onClick={uploadHandler}/>
      </div>
      {changeMode && <div className={s.changeButtonMode}>
        <Button onClick={savaHandler} isSpinner={isLoadingProfile}>Change photo</Button>
        <Button onClick={cancelHandler} isSpinner={isLoadingProfile}>Cancel</Button>
      </div>}
      <div className={s.nameBlock}>
        <h1>{fullName}</h1>
        <p>Status:</p>
        <div className={s.statusBlock}>
          <h2>{editMode ? null : status}</h2>
          {editMode ? <InputText value={statusValue} onChangeText={setStatusValue}/> : null}
          <Button onClick={editModeHandler}
                  isSpinner={isLoadingProfile}
                  className={s.buttonChange}>edit status</Button>
        </div>
      </div>
    </div>
  );
};
