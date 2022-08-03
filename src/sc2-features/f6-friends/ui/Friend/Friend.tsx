import React from 'react';
import s from './Friend.module.scss'
import {NavLink} from "react-router-dom";
import defaultAva from "../../../../assets/img/small_ava.jpg";
import {Button} from "../../../../sc1-main/m1-ui/common/components/Button/Button";
import {UsersItemType} from "../../../f5-users/bll/usersReducer";
import {FollowUnfollow} from "../../../../sc1-main/m1-ui/common/components/FollowUnfollow/FollowUnfollow";


type FriendPropsType = {
  users: UsersItemType[]
}
export const Friend: React.FC<FriendPropsType> = ({users}) => {

  return (<>
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
              <FollowUnfollow userId={friend.id} followed={friend.followed} customStyle={s.buttonFollow}/>
              <Button>Message</Button>
            </div>
          </div>
        </div>
      </div>
    })}
  </>);
};
