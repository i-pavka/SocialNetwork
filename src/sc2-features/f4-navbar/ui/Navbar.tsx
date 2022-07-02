import React from 'react';
import s from './Navbar.module.scss';
import {PATH} from "../../../sc1-main/m1-ui/Main/routes/SelfRouterы";
import {NavLink} from "react-router-dom";

export const Navbar = () => {

  return (
      <nav className={s.navbarMain}>
        <ul className={s.navbarList}>
          <SelfNavLink urlPath={PATH.PROFILE} title={'Profile'}/>
          <SelfNavLink urlPath={PATH.USERS} title={'Users'}/>
          <SelfNavLink urlPath={PATH.DIALOGS} title={'Dialogs'}/>
          <SelfNavLink urlPath={PATH.FRIENDS} title={'Friends'}/>
          <SelfNavLink urlPath={PATH.NEWS} title={'News'}/>
          <SelfNavLink urlPath={PATH.SETTINGS} title={'Settings'}/>
        </ul>
      </nav>
  );
};

const SelfNavLink = ({urlPath, title}: { urlPath: string, title: string }) => {
  return (
    <li className={s.navbarListItem}>
      <NavLink to={urlPath}>
        {({isActive}) => (
          <span className={isActive ? `${s.navItem} ${s.active}` : s.navItem}>{title}</span>
        )}
      </NavLink>
    </li>
  )
}
