import {uId} from "../../../sc3-utils/uid";

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
  state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case "app/SET-PROFILE-DATA":
    return {...state, ...action.payload}
    default:
      return state
  }
}

export type AppActionType = ReturnType<typeof setProfileDataAC>


export const setProfileDataAC = (profile: ProfileType) =>
  ({type: "app/SET-PROFILE-DATA", payload: {profile}} as const);




