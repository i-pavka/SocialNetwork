import React from 'react';
import {UsersItemType} from "../bll/usersReducer";
import {NavLink} from "react-router-dom";
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import s from './User.module.scss'
import defaultAva from "../../../assets/img/small_ava.jpg";


type UserPropsType = {
  users: UsersItemType
}

export const User: React.FC<UserPropsType> = (
  {
    users,
  }
) => {

  const followHandler = () => {
    console.log('Follow');
  }
  const unfollowHandler = () => {
    console.log('Unfollow');
  }

  return (
    <div className={s.userMainBlock}>
      <div className={s.userWrapper}>
        <NavLink to={`/profile/${users.id}`}>
          <img className={s.userPhoto}
               src={users.photos.small ? users.photos.small : defaultAva}
               alt="user-ava"/>
        </NavLink>
        <div className={s.userName}>
          <p>{users.name}</p>
        </div>
        <Button onClick={users.followed ? followHandler : unfollowHandler}>
          {users.followed ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </div>
  );
};
