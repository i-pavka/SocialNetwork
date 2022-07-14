import {uId} from "../../../sc3-utils/uid";
import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {toggleAppLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {profileAPI} from "../../../sc1-main/m3-dal/profile-api";

export type PostsType = {
  id: string
  message: string
  likesCount: number
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
  photos: {
    small: null | string
    large: null | string
  },
}

const initialState = {
  posts: [
    {id: uId(), message: "Hello! Hello! Hello!", likesCount: 1},
    {id: uId(), message: "Yep!", likesCount: 5},
    {id: uId(), message: "Bay!", likesCount: 10},
  ] as PostsType[],
  profile: {} as ProfileType,
  isFetching: true,
  status: '',
}

type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
  switch (action.type) {
    case "profile/SET-PROFILE-DATA":
    case "profile/SET-PROFILE-STATUS":
      return {...state, ...action.payload}
    default:
      return state
  }
}

export type ProfileActionType = ReturnType<typeof setProfileDataAC>
| ReturnType<typeof setProfileStatusAC>

// Action creators
export const setProfileDataAC = (profile: ProfileType) =>
  ({type: "profile/SET-PROFILE-DATA", payload: {profile}} as const);
export const setProfileStatusAC = (status: string) =>
  ({type: "profile/SET-PROFILE-STATUS", payload: {status}} as const);

// Thunks
export const getProfileDataTC = (userId: string = ''): AppThunkType => (dispatch, getState) => {
  const {id} = getState().auth.authData;
  dispatch(toggleAppLoadingAC(true));
  profileAPI.getProfileData(userId ? userId : id)
    .then(res => {
      dispatch(setProfileDataAC(res));
      // console.log('profile/:profileId', res);
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleAppLoadingAC(false)));
};

export const getProfileStatusTC = (userId: string = ''): AppThunkType => (dispatch, getState) => {
  const {id} = getState().auth.authData;
  dispatch(toggleAppLoadingAC(true));
  profileAPI.getProfileStatus(userId ? userId : id)
    .then(res => {
      dispatch(setProfileStatusAC(res));
      // console.log('profile/Status', res);
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleAppLoadingAC(false)));
};






