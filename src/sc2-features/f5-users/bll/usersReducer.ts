import {usersAPI} from "../../../sc1-main/m3-dal/users-api";
import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppErrorAC, toggleAppLoadingAC} from "../../../sc1-main/m2-bll/appReducer";


export type UsersItemType = {
  id: number
  name: string
  followed: boolean
  photos: {
    large: null | string
    small: null | string
  }
  status: null | string
  uniqueUrlName: null | string
}


const initialState = {
  users: [] as UsersItemType[],
  totalCount: 0,
  pageSize: 15,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as number[]
}

type InitialStateType = typeof initialState

export const usersReducer = (
  state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
  switch (action.type) {
    case "users/SET-USERS-DATA":
      return {...state, ...action.payload};
    default:
      return state
  }
}

export type UsersActionType = ReturnType<typeof setUsersDataAC>


export const setUsersDataAC = (users: UsersItemType[]) => (
  {type: "users/SET-USERS-DATA", payload: {users}} as const);


export const getUsersDataTC = (userName: string = ''): AppThunkType => (dispatch, getState) => {
  dispatch(toggleAppLoadingAC(true));
  const {currentPage, pageSize} = getState().users;
  usersAPI.getUsers(currentPage, pageSize , userName)
    .then(res => {
      console.log(res);
      if (!res.error) {
        dispatch(setUsersDataAC(res.items));
      }
      dispatch(setAppErrorAC(res.error));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleAppLoadingAC(false)));
};


