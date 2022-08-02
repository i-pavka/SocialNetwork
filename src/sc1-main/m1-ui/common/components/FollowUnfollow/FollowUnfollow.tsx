import React from 'react';
import {followOrUnfollowTC, UsersItemType} from "../../../../../sc2-features/f5-users/bll/usersReducer";
import {Button} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../m2-bll/store";

type FollowUnfollowPropsType = {
  friend: UsersItemType
  customStyle?: string
}

export const FollowUnfollow: React.FC<FollowUnfollowPropsType> = (
  {
    friend,
    customStyle,
  }
) => {

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.app.appIsLoading);

  const followHandler = (userId: number) => {
    dispatch(followOrUnfollowTC(userId, 'follow'));
  }
  const unfollowHandler = (userId: number) => {
    dispatch(followOrUnfollowTC(userId, 'unfollow'));
  }
  return (
    <Button onClick={() => friend.followed ? unfollowHandler(friend.id) : followHandler(friend.id)}
            color={'other'}
            disabled={isLoading}
            className={customStyle}>
      {friend.followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
