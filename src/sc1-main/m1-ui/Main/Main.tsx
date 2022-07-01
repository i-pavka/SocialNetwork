import React, {useEffect} from 'react';
import {Header} from "../../../sc2-features/f3-header/ui/Header";
import {SelfRouter} from "./routes/SelfRouterы";
import {Navbar} from "../../../sc2-features/f4-navbar/ui/Navbar";
import s from './Main.module.scss'
import {useAppDispatch, useAppSelector} from "../../m2-bll/store";
import {MainSpinner} from "../common/components/MainSpinner/MainSpinner";
import {getAuthTC} from "../../../sc2-features/f1-auth/Login/bll/authReducer";
import {Snackbar} from "../common/components/Snackbar/Snackbar";

export const Main = () => {

  const appIsInitialized = useAppSelector<boolean>(state => state.app.appIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthTC());
  }, [dispatch]);

  if (!appIsInitialized) {
    return <MainSpinner/>
  }

  return (
    <>
      <Header/>
      <div className={s.mainContainer}>
        <aside>
          <Navbar/>
        </aside>
        <SelfRouter/>
        <Snackbar/>
      </div>
    </>
  );
};
