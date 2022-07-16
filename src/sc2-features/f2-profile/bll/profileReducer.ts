import {uId} from "../../../sc3-utils/uid";
import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {toggleAppLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {profileAPI} from "../../../sc1-main/m3-dal/profile-api";
import {setHeaderLogoAC} from "../../f1-auth/Login/bll/authReducer";

export type PostsType = {
  id: string
  message: string
  likesCount: number
}
type ProfilePhoto = {
  small: null | string
  large: null | string
}
export type ProfileType = {
  aboutMe: null | string
  contacts: {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
  },
  lookingForAJob: boolean
  lookingForAJobDescription: null | string
  fullName: string
  userId: string
  photos: ProfilePhoto,
}

const initialState = {
  posts: [
    {id: uId(), message: "Hello! Hello! Hello!", likesCount: 1},
    {id: uId(), message: "Yep!", likesCount: 5},
    {id: uId(), message: "Bay!", likesCount: 10},
  ] as PostsType[],
  profile: {} as ProfileType,
  isLoadingProfile: false,
  status: '',
}

type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
  switch (action.type) {
    case "profile/SET-PROFILE-DATA":
    case "profile/SET-PROFILE-STATUS":
    case "profile/TOGGLE-PROFILE-LOADING":
      return {...state, ...action.payload}
    case "profile/CHANGE-PROFILE-PHOTO":
      return {...state, profile: {...state.profile, ...action.payload}}
    default:
      return state
  }
}

export type ProfileActionType = ReturnType<typeof setProfileDataAC>
| ReturnType<typeof setProfileStatusAC>
| ReturnType<typeof toggleProfileLoadingAC>
| ReturnType<typeof changeProfilePhotoAC>

// Action creators
export const setProfileDataAC = (profile: ProfileType) =>
  ({type: "profile/SET-PROFILE-DATA", payload: {profile}} as const);
export const setProfileStatusAC = (status: string) =>
  ({type: "profile/SET-PROFILE-STATUS", payload: {status}} as const);
export const toggleProfileLoadingAC = (isLoadingProfile: boolean) =>
  ({type: "profile/TOGGLE-PROFILE-LOADING", payload: {isLoadingProfile}} as const);
export const changeProfilePhotoAC = (photos: ProfilePhoto) =>
  ({type: "profile/CHANGE-PROFILE-PHOTO", payload: {photos}} as const);

// Thunks
export const getProfileDataTC = (userId: string = ''): AppThunkType => (dispatch, getState) => {
  const {id} = getState().auth.authData;
  dispatch(toggleAppLoadingAC(true));
  profileAPI.getProfileData(userId)
    .then(res => {
      id === res.userId && dispatch(setHeaderLogoAC(res.photos.small));
      dispatch(setProfileDataAC(res));
      // console.log('profile/:profileId', res);
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.message
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleAppLoadingAC(false)));
};

export const getProfileStatusTC = (userId: string = ''): AppThunkType => (dispatch) => {
  dispatch(toggleAppLoadingAC(true));
  profileAPI.getProfileStatus(userId)
    .then(res => {
      dispatch(setProfileStatusAC(res));
      // console.log('profile/Status', res);
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.message
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleAppLoadingAC(false)));
};

export const changeProfileStatusTC = (status: string): AppThunkType => (dispatch) => {
  dispatch(toggleProfileLoadingAC(true));
  profileAPI.changeProfileStatus(status)
    .then(res => {
      dispatch(setProfileStatusAC(status));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    })
    .finally(() => dispatch(toggleProfileLoadingAC(false)));
};

export const setProfilePhotoTC = (photoFile: FormData): AppThunkType => (dispatch) => {
  dispatch(toggleProfileLoadingAC(true));
  profileAPI.setProfilePhoto(photoFile)
    .then(res => {
      // console.log('Photo: ',res);
      dispatch(changeProfilePhotoAC(res.data.photos));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    })
    .finally(() => dispatch(toggleProfileLoadingAC(false)));
};







