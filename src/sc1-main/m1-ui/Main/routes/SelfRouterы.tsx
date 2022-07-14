import React from 'react';
import s from '../Main.module.scss'
import {Navigate, Routes, Route} from "react-router-dom";
import {Error404} from "../Error404/Error404";
import {Profile} from "../../../../sc2-features/f2-profile/ui/Profile";
import {Login} from "../../../../sc2-features/f1-auth/Login/ui/Login";
import {Users} from "../../../../sc2-features/f5-users/ui/Users";
import {Friends} from "../../../../sc2-features/f6-friends/ui/Friends";
import {Dialogs} from "../../../../sc2-features/f7-dialogs/ui/Dialogs";
import {News} from "../../../../sc2-features/f8-news/ui/News";
import {Settings} from "../../../../sc2-features/f9-settings/ui/Settings";
import {RequireAuth} from "../../common/hoc/RequireAuth";
import {NoticeInfo} from "../../../../sc2-features/f10-notice/NoticeInfo";

export const PATH = {
  LOGIN: '/login',
  PROFILE: '/profile/*',
  USERS: '/users',
  FRIENDS: '/friends',
  DIALOGS: '/dialogs',
  NEWS: '/news',
  SETTINGS: '/settings',
  INFO: '/info',

}

export const SelfRouter = () => {
  return (
    <main className={s.mainBlock}>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
        <Route path={PATH.PROFILE} element={
          <RequireAuth><Profile/></RequireAuth>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.USERS} element={<Users/>}/>
        <Route path={PATH.FRIENDS} element={
          <RequireAuth><Friends/></RequireAuth>}/>
        <Route path={PATH.DIALOGS} element={
          <RequireAuth><Dialogs/></RequireAuth>}/>
        <Route path={PATH.NEWS} element={<News/>}/>
        <Route path={PATH.INFO} element={<NoticeInfo/>}/>
        <Route path={PATH.SETTINGS} element={
          <RequireAuth><Settings/></RequireAuth>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </main>
  );
};

