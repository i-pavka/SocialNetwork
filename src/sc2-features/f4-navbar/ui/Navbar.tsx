import React from 'react';
import s from './Navbar.module.scss';
import {PATH} from "../../../sc1-main/m1-ui/Main/routes/SelfRouterы";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../sc1-main/m2-bll/store";

export const Navbar = () => {
  const loginID = useAppSelector(state => state.auth.authData.id);
  const profileID = loginID ? loginID : '2' // example of a profile without a login

  return (
      <nav className={s.navbarMain}>
        <ul className={s.navbarList}>
          <SelfNavLink urlPath={PATH.PROFILE + profileID} title={'Profile'}/>
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
