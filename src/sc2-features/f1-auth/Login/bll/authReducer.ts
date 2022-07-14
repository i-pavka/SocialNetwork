import {AppThunkType} from "../../../../sc1-main/m2-bll/store";
import {authAPI} from "../../../../sc1-main/m3-dal/auth-api";
import {setAppErrorAC, setAppIsInitializedAC, toggleAppLoadingAC} from "../../../../sc1-main/m2-bll/appReducer";
import {FormType} from "../ui/LoginForm/LoginForm";


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
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case "auth/SET-USER-DATA":
    case "auth/TOGGLE-IS-AUTH":
      return {...state, ...action.payload};
    default:
      return state
  }
}

export type AuthActionType = ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof toggleIsAuthAC>

export const setAuthUserDataAC = (authData: DataAuthType) => (
  {type: "auth/SET-USER-DATA", payload: {authData}} as const);
export const toggleIsAuthAC = (isAuth: boolean) => (
  {type: "auth/TOGGLE-IS-AUTH", payload: {isAuth}} as const);

export const getAuthTC = (): AppThunkType => (dispatch) => {
  authAPI.getAuthMe()
    .then(res => {
      // console.log('auth/me:', res)
      if (res.resultCode === 0) {
        dispatch(setAuthUserDataAC(res.data));
        dispatch(toggleIsAuthAC(true));
      }
      dispatch(setAppErrorAC(res.messages[0]));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(setAppIsInitializedAC(true)));
};

export const authLoginTC = (data: FormType): AppThunkType => (dispatch) => {
  dispatch(toggleAppLoadingAC(true));
  authAPI.authLogIn(data)
    .then(res => {
      // console.log('auth/login', res);
      if (res.resultCode === 0) {
        dispatch(getAuthTC());
        console.log(res.data.userId)
      }
      dispatch(setAppErrorAC(res.messages[0]));
    }).catch(error => {
    const errorMessage = error.response
      ? error.response.data.error
      : (error.message + ', more details in the console');
    console.log('Error: ', errorMessage);
  }).finally(() => dispatch(toggleAppLoadingAC(false)));
}

export const authLogOutTC = (): AppThunkType => (dispatch) => {
  dispatch(toggleAppLoadingAC(true));
  authAPI.authLogOut()
    .then(res => {
      dispatch(setAuthUserDataAC(res.data));
      dispatch(toggleIsAuthAC(false));
    }).catch(error => {
    const errorMessage = error.response
      ? error.response.data.error
      : (error.message + ', more details in the console');
    console.log('Error: ', errorMessage);
  }).finally(() => dispatch(toggleAppLoadingAC(false)));
}