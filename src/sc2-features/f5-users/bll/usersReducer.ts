import {usersAPI} from "../../../sc1-main/m3-dal/users-api";
import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppErrorAC, toggleAppLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {followingAPI} from "../../../sc1-main/m3-dal/following-api";


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

export type FollowType = 'follow' | 'unfollow'


const initialState = {
  users: [] as UsersItemType[],
  totalCount: 0,
  pageSize: 15,
  currentPage: 1,
  isLoadingUsers: false,
}

type InitialStateType = typeof initialState

export const usersReducer = (
  state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
  switch (action.type) {
    case "users/SET-USERS-DATA":
    case "users/SET-TOTAL-USERS-COUNT":
    case "users/SET-CURRENT-PAGE":
    case "users/SET-PAGE-SIZE":
    case "users/TOGGLE-USERS-LOADING":
      return {...state, ...action.payload};
    case "users/CHANGE-FOLLOW-OR-UNFOLLOW":
      return {...state,
        users: state.users
          .map(user => user.id === action.payload.userId ? {...user, followed: action.payload.isFollow} : user)}
    default:
      return state
  }
}

export type UsersActionType = ReturnType<typeof setUsersDataAC>
| ReturnType<typeof setTotalUserCountAC>
| ReturnType<typeof setCurrentPageAC>
| ReturnType<typeof setPageSizeAC>
| ReturnType<typeof toggleUsersLoadingAC>
| ReturnType<typeof changeFollowOrUnfollowAC>


export const setUsersDataAC = (users: UsersItemType[]) => (
  {type: "users/SET-USERS-DATA", payload: {users}} as const);
export const setTotalUserCountAC = (totalCount: number) => (
  {type: "users/SET-TOTAL-USERS-COUNT", payload: {totalCount}} as const);
export const setCurrentPageAC = (currentPage: number) => (
  {type: "users/SET-CURRENT-PAGE", payload: {currentPage}} as const);
export const setPageSizeAC = (pageSize: number) => (
  {type: "users/SET-PAGE-SIZE", payload: {pageSize}} as const);
export const toggleUsersLoadingAC = (isLoadingUsers: boolean) =>
  ({type: "users/TOGGLE-USERS-LOADING", payload: {isLoadingUsers}} as const);
export const changeFollowOrUnfollowAC = (userId: number, isFollow: boolean) =>
  ({type: "users/CHANGE-FOLLOW-OR-UNFOLLOW", payload: {userId, isFollow}} as const);


export const getUsersDataTC = (userName: string = '', isFriends: boolean = false): AppThunkType => (dispatch, getState) => {
  dispatch(toggleAppLoadingAC(true));
  const {currentPage, pageSize} = getState().users;
  usersAPI.getUsers(currentPage, pageSize, userName, isFriends)
    .then(res => {
      if (!res.error) {
        dispatch(setUsersDataAC(res.items));
        dispatch(setTotalUserCountAC(res.totalCount));
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

export const followOrUnfollowTC = (userId: number, action: FollowType): AppThunkType => (dispatch) => {
  dispatch(toggleUsersLoadingAC(true));
  followingAPI.userFollow(userId, action)
    .then(res => {
      console.log(res);
      if (res.dataResponse.resultCode === 0) {
        dispatch(changeFollowOrUnfollowAC(userId, res.isFollow));
      }
      dispatch(setAppErrorAC(res.dataResponse.messages[0]));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (`${error.message}, more details in the console`);
      console.log('Error: ', errorMessage);
    }).finally(() => dispatch(toggleUsersLoadingAC(false)));
};


