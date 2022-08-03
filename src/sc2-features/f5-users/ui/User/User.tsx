import React from 'react';
import {NavLink} from "react-router-dom";
import s from './User.module.scss'
import defaultAva from "../../../../assets/img/small_ava.jpg";
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {FollowUnfollow} from "../../../../sc1-main/m1-ui/common/components/FollowUnfollow/FollowUnfollow";


export const User = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth);
  const users = useAppSelector(state => state.users.users);

  return (<>
    {users.map(user => {
      return <div key={user.id} className={s.userMainBlock}>
        <div className={s.userWrapper}>
          <NavLink to={`/profile/${user.id}`} target='_blank'>
            <img className={s.userPhoto}
                 src={user.photos.small ? user.photos.small : defaultAva}
                 alt="user-ava"/>
          </NavLink>
          {isAuth && <FollowUnfollow userId={user.id} followed={user.followed} customStyle={s.buttonFollow}/>}
          <div className={s.userName}>
            <p>{user.name}</p>
          </div>
        </div>
      </div>
    })}
  </>);
};
