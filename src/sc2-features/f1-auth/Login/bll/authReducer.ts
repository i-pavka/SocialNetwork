import {Dispatch} from "redux";
import {AppThunkType} from "../../../../sc1-main/m2-bll/store";
import {authAPI} from "../../../../sc1-main/m3-dal/auth-api";
import {setAppErrorAC, setAppIsInitializedAC} from "../../../../sc1-main/m2-bll/appReducer";


export type DataAuthType = {
  id: number,
  login: string,
  email: string,
}
export type AuthType = {
  data: DataAuthType,
  messages: string[],
  fieldsErrors: string[],
  resultCode: number
}

const initialState = {
  authData: {
    id: 0,
    login: '',
    email: '',
  } ,
  isAuth: false,
  appError: null as null | string,
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case "auth/SET-USER-DATA":
      return {...state, ...action.payload}
    default:
      return state
  }
}

export type AuthActionType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (authData: DataAuthType) => (
  {type: "auth/SET-USER-DATA", payload: {authData}} as const)

export const getAuthTC = (): AppThunkType => (dispatch) => {
  authAPI.getAuthMe()
    .then(res => {
      console.log(res)
      if (res.resultCode === 0) {
        dispatch(setAuthUserDataAC(res.data));
      }
      dispatch(setAppErrorAC(res.messages[0]));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');
      console.log('Error: ', errorMessage);
    })
  .finally(() => dispatch(setAppIsInitializedAC(true)))
};

export const _getAuthTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.getAuthMe();
    if (res.resultCode === 0) {
      dispatch(setAuthUserDataAC(res));
    }
  } catch (e) {
    console.log(e);
  }
}

// export const authLogInThunkCreator = (
//   email: string, password: string, rememberMe: boolean, setStatus: any) => {
//   return async () => {
//     try {
//       const data = await usersAPI.authLogIn(email, password, rememberMe);
//       if (data.resultCode === 0) window.location.reload();
//       else {
//         // error incorrect password or email
//         setStatus(data.messages);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//
//   }
// }
// export const authLogOutThunkCreator = () => {
//   return async () => {
//     try {
//       const data = await usersAPI.authLogOut();
//       if (data.resultCode === 0) window.location.reload();
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }