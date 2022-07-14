import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionType, appReducer} from "./appReducer";
import {AuthActionType, authReducer} from "../../sc2-features/f1-auth/Login/bll/authReducer";
import {ProfileActionType, profileReducer} from "../../sc2-features/f2-profile/bll/profileReducer";


export type AppStateType = ReturnType<typeof rootReducer>;
export type RootActionsType = | AuthActionType
  | AppActionType | ProfileActionType;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
});

// Custom `useDispatch` and `useSelector: Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;