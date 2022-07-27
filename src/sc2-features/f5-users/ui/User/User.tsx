import React from 'react';
import {NavLink} from "react-router-dom";
import s from './User.module.scss'
import defaultAva from "../../../../assets/img/small_ava.jpg";
import {Button} from "../../../../sc1-main/m1-ui/common/components/Button/Button";
import {followOrUnfollowTC, UsersItemType} from "../../bll/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";


type UserPropsType = {
  users: UsersItemType
}

export const User: React.FC<UserPropsType> = ({users}) => {

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const isLoading = useAppSelector(state => state.users.isLoadingUsers);

  const followHandler = () => {
    dispatch(followOrUnfollowTC(users.id, 'follow'));
  }
  const unfollowHandler = () => {
    dispatch(followOrUnfollowTC(users.id, 'unfollow'));
  }

  return (
    <div className={s.userMainBlock}>
      <div className={s.userWrapper}>
        <NavLink to={`/profile/${users.id}`}>
          <img className={s.userPhoto}
               src={users.photos.small ? users.photos.small : defaultAva}
               alt="user-ava"/>
        </NavLink>
        {isAuth && <Button onClick={users.followed ? unfollowHandler : followHandler}
                           color={'other'}
                           disabled={isLoading}
                           className={s.buttonFollow}>
          {users.followed ? 'Unfollow' : 'Follow'}
        </Button>}
        <div className={s.userName}>
          <p>{users.name}</p>
        </div>
      </div>
    </div>
  );
};
