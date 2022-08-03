import {utilityFunctions} from "../../../sc3-utils/utilityFunctions";
import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {toggleAppLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {profileAPI} from "../../../sc1-main/m3-dal/profile-api";
import {saveState} from "../../../sc3-utils/localstorage";
import {setHeaderLogoAC} from "../../f1-auth/Login/bll/authReducer";
import {EditProfileFormType} from "../ui/EditProfileData/EditProfileData";
import {makeErrorObject} from "../../../sc3-utils/handleError";
import {apiConfig} from "../../../sc3-utils/config";
import {followingAPI} from "../../../sc1-main/m3-dal/following-api";

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
  userId?: string
  photos?: ProfilePhoto,
}

const initialState = {
  posts: [
    {id: utilityFunctions(), message: "Hello! Hello! Hello!", likesCount: 1},
    {id: utilityFunctions(), message: "Yep!", likesCount: 5},
    {id: utilityFunctions(), message: "Bay!", likesCount: 10},
  ] as PostsType[],
  profile: {} as ProfileType,
  isLoadingProfile: false,
  isProfileFollowing: null as boolean | null,
  status: '',
  formError: {} as {[key: string]: string},
}

type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
  switch (action.type) {
    case "profile/SET-PROFILE-DATA":
    case "profile/SET-PROFILE-STATUS":
    case "profile/TOGGLE-PROFILE-LOADING":
    case "profile/SET-FORM-ERROR":
    case "profile/TOGGLE-IS-FOLLOWING-PROFILE":
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
  | ReturnType<typeof setFormErrorAC>
  | ReturnType<typeof toggleIsFollowingProfileAC>

// Action creators
export const setProfileDataAC = (profile: ProfileType) =>
  ({type: "profile/SET-PROFILE-DATA", payload: {profile}} as const);
export const setProfileStatusAC = (status: string) =>
  ({type: "profile/SET-PROFILE-STATUS", payload: {status}} as const);
export const toggleProfileLoadingAC = (isLoadingProfile: boolean) =>
  ({type: "profile/TOGGLE-PROFILE-LOADING", payload: {isLoadingProfile}} as const);
export const changeProfilePhotoAC = (photos: ProfilePhoto) =>
  ({type: "profile/CHANGE-PROFILE-PHOTO", payload: {photos}} as const);
export const setFormErrorAC = (formError: {[key: string]: string}) =>
  ({type: "profile/SET-FORM-ERROR", payload: {formError}} as const);
export const toggleIsFollowingProfileAC = (isProfileFollowing: boolean | null) =>
  ({type: "profile/TOGGLE-IS-FOLLOWING-PROFILE", payload: {isProfileFollowing}} as const);

// Thunks
export const getProfileDataTC = (userId: string = ''): AppThunkType => (dispatch, getState) => {
  const id = getState().auth.userID;
  dispatch(toggleAppLoadingAC(true));
  profileAPI.getProfileData(userId)
    .then(res => {
      if (Number(id) === res.userId) {
        dispatch(setHeaderLogoAC(res.photos.small))
        saveState(res.photos.small);
      }
      dispatch(setProfileDataAC(res));
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
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.message
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleAppLoadingAC(false)));
};

export const changeProfileStatusTC = (status: string): AppThunkType => (dispatch, getState) => {
  dispatch(toggleProfileLoadingAC(true));
  const id = getState().auth.userID;  // for development
  profileAPI.changeProfileStatus(status, String(id) === apiConfig.AUTH_ID)
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
      dispatch(changeProfilePhotoAC(res.data.photos));
      dispatch(setHeaderLogoAC(res.data.photos.small));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    })
    .finally(() => dispatch(toggleProfileLoadingAC(false)));
};

export const setProfileDataTC = (profileData: EditProfileFormType): AppThunkType => (dispatch,getState) => {
  const id = getState().auth.userID;
  const error = getState().profile.formError;
  dispatch(toggleProfileLoadingAC(true));
  profileAPI.setProfileData(profileData)
    .then(res => {
      if (res.resultCode === 0) {
        Object.keys(error).length !== 0 && dispatch(setFormErrorAC({}));
        dispatch(getProfileDataTC(id));
      } else {
        const finalObject = makeErrorObject(res.messages);
        dispatch(setFormErrorAC(finalObject));
      }
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    })
    .finally(() => dispatch(toggleProfileLoadingAC(false)));
};

export const getIsFollowingProfileTC = (userId: number): AppThunkType => (dispatch) => {
  dispatch(toggleProfileLoadingAC(true));
  followingAPI.checkFollowingStatus(userId)
    .then(res => {
      dispatch(toggleIsFollowingProfileAC(res));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    })
    .finally(() => dispatch(toggleProfileLoadingAC(false)));
};







