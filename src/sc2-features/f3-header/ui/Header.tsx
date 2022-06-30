import React from 'react';
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/routes/SelfRouterы";

export const Header = () => {

  const getNavLinkStyle = (navData: { isActive: boolean }) => {
    return navData.isActive ? `${s.item} ${s.active}` : s.item;
  };

  return (
    <div className={s.headerMain}>
      <NavLink to={PATH.PROFILE}
               className={(navData) => getNavLinkStyle(navData)}>
        Profile
      </NavLink>
      <NavLink to={PATH.USERS}
               className={(navData) => getNavLinkStyle(navData)}>
        Users
      </NavLink>
      <NavLink to={PATH.FRIENDS}
               className={(navData) => getNavLinkStyle(navData)}>
        Friends
      </NavLink>
      <NavLink to={PATH.DIALOGS}
               className={(navData) => getNavLinkStyle(navData)}>
        Dialogs
      </NavLink>
      <NavLink to={PATH.NEWS}
               className={(navData) => getNavLinkStyle(navData)}>
        News
      </NavLink>
      <NavLink to={PATH.SETTINGS}
               className={(navData) => getNavLinkStyle(navData)}>
        Settings
      </NavLink>
    </div>
  );
};
