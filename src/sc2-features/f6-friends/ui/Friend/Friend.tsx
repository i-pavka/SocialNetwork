import React from 'react';
import s from './Friend.module.scss'
import {NavLink} from "react-router-dom";
import defaultAva from "../../../../assets/img/small_ava.jpg";
import {Button} from "../../../../sc1-main/m1-ui/common/components/Button/Button";
import {followOrUnfollowTC, UsersItemType} from "../../../f5-users/bll/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";


type FriendPropsType = {
  users: UsersItemType[]
}
export const Friend: React.FC<FriendPropsType> = ({users}) => {

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.app.appIsLoading);

  const followHandler = (userId: number) => {
    dispatch(followOrUnfollowTC(userId, 'follow'));
  }
  const unfollowHandler = (userId: number) => {
    dispatch(followOrUnfollowTC(userId, 'unfollow'));
  }

  return (
    <>
      {users.map(friend => {
        return <div key={friend.id} className={s.friendsList}>
          <div className={s.friend}>
            <div className={s.avaBlock}>
              <NavLink to={`/profile/${friend.id}`} target='_blank'>
                <img className={s.userPhoto}
                     src={friend.photos.small ? friend.photos.small : defaultAva}
                     alt="user-ava"/>
              </NavLink>
            </div>
            <div className={s.infoBlock}>
              <p>{friend.name}</p>
              <p>{friend.status}</p>
              <div className={s.buttonBlock}>
                <Button onClick={() => friend.followed ? unfollowHandler(friend.id) : followHandler(friend.id)}
                        color={'other'}
                        disabled={isLoading}
                        className={s.buttonFollow}>
                  {friend.followed ? 'Unfollow' : 'Follow'}
                </Button>
                <Button>Message</Button>
              </div>
            </div>
          </div>
        </div>
      })}
    </>
  );
};
