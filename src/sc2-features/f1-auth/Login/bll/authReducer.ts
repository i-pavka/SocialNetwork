import {AppThunkType} from "../../../../sc1-main/m2-bll/store";
import {authAPI} from "../../../../sc1-main/m3-dal/auth-api";
import {setAppErrorAC, setAppIsInitializedAC, toggleAppLoadingAC} from "../../../../sc1-main/m2-bll/appReducer";
import {FormType} from "../ui/LoginForm/LoginForm";
import {getProfileDataTC} from "../../../f2-profile/bll/profileReducer";
import {clearState} from "../../../../sc3-utils/localstorage";


export type DataAuthType = {
  id: string,
  login: string,
  email: string,
}

const initialState = {
  authData: {
    id: '',
    login: '',
    email: '',
  },
  isAuth: false,
  headerLogo: '',
  userID: '',
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case "auth/SET-USER-DATA":
    case "auth/TOGGLE-IS-AUTH":
    case "auth/SET-USER-ID":
    case "auth/SET-HEADER-LOGO":
      return {...state, ...action.payload};
    default:
      return state
  }
}

export type AuthActionType = ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof toggleIsAuthAC>
  | ReturnType<typeof setUserIdAC>
  | ReturnType<typeof setHeaderLogoAC>

export const setAuthUserDataAC = (authData: DataAuthType) => (
  {type: "auth/SET-USER-DATA", payload: {authData}} as const);
export const toggleIsAuthAC = (isAuth: boolean) => (
  {type: "auth/TOGGLE-IS-AUTH", payload: {isAuth}} as const);
export const setUserIdAC = (userID: string) => (
  {type: "auth/SET-USER-ID", payload: {userID}} as const);
export const setHeaderLogoAC = (headerLogo: string) => (
  {type: "auth/SET-HEADER-LOGO", payload: {headerLogo}} as const);

export const getAuthTC = (): AppThunkType => (dispatch) => {
  authAPI.getAuthMe()
    .then(res => {
      if (res.resultCode === 0) {
        dispatch(setAuthUserDataAC(res.data));
        dispatch(setUserIdAC(res.data.id));
        dispatch(toggleIsAuthAC(true));
      }
      dispatch(setAppErrorAC(res.messages[0]));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(setAppIsInitializedAC(true)));
};

export const authLoginTC = (data: FormType): AppThunkType => (dispatch) => {
  dispatch(toggleAppLoadingAC(true));
  authAPI.authLogIn(data)
    .then(res => {
      if (res.resultCode === 0) {
        dispatch(setUserIdAC(res.data.userId));
        dispatch(getAuthTC());
        dispatch(getProfileDataTC(res.data.userId));
      }
      dispatch(setAppErrorAC(res.messages[0]));
    }).catch(error => {
    const errorMessage = error.response
      ? error.response.data.error
      : (`${error.message}, more details in the console`);
    console.log('Error: ', errorMessage);
  }).finally(() => dispatch(toggleAppLoadingAC(false)));
}

export const authLogOutTC = (): AppThunkType => (dispatch) => {
  dispatch(toggleAppLoadingAC(true));
  authAPI.authLogOut()
    .then(res => {
      dispatch(setAuthUserDataAC(res.data));
      dispatch(setHeaderLogoAC(''));
      dispatch(setUserIdAC(''));
      dispatch(toggleIsAuthAC(false));
      clearState();
    }).catch(error => {
    const errorMessage = error.response
      ? error.response.data.error
      : (`${error.message}, more details in the console`);
    console.log('Error: ', errorMessage);
  }).finally(() => dispatch(toggleAppLoadingAC(false)));
}