const initialState = {
  appIsInitialized: false,
  appError: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case "app/SET-ERROR":
    case "app/SET-INITIALIZED":
      return {...state, ...action.payload}
    default:
      return state
  }
}

export type AppActionType = ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppIsInitializedAC>

export const setAppErrorAC = (appError: null | string) =>
  ({type: "app/SET-ERROR", payload: {appError}} as const);
export const setAppIsInitializedAC = (appIsInitialized: boolean) =>
  ({type: "app/SET-INITIALIZED", payload: {appIsInitialized}} as const);



