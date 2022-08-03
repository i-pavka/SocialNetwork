import React from 'react';
import {followOrUnfollowTC} from "../../../../../sc2-features/f5-users/bll/usersReducer";
import {Button} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../m2-bll/store";

type FollowUnfollowPropsType = {
  userId: number
  followed: boolean | null
  customStyle?: string
}

export const FollowUnfollow: React.FC<FollowUnfollowPropsType> = (
  {
    userId,
    followed,
    customStyle,
  }
) => {

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.users.isLoadingUsers);

  const followUnfollowHandler = () => {
    if(followed) {
      dispatch(followOrUnfollowTC(userId, 'unfollow'));
    } else {
      dispatch(followOrUnfollowTC(userId, 'follow'));
    }
  }

  return (
      <Button onClick={followUnfollowHandler}
              color={'other'}
              disabled={isLoading}
              className={customStyle}>
        {followed ? 'Unfollow' : 'Follow'}
      </Button>
  );
};
