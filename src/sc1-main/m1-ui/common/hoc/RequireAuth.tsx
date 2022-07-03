import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../../../m2-bll/store";

export const RequireAuth = ({children}: { children: JSX.Element }) => {

  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={"/login"} state={{from: location}} replace/>
  }

  return children
};

