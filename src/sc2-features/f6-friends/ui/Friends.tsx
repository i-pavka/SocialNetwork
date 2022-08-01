import React, {useEffect} from 'react';
import s from './Friends.module.scss';
import {followOrUnfollowTC, getUsersDataTC, setCurrentPageAC, setPageSizeAC} from "../../f5-users/bll/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import defaultAva from "../../../assets/img/small_ava.jpg";
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import {Paginator} from "../../f5-users/ui/Paginator/Paginator";
import {SuperSelect} from "../../../sc1-main/m1-ui/common/components/SuperSelect/SuperSelect";
import {useLocation, useSearchParams, NavLink} from "react-router-dom";



export const Friends = () => {

  const dispatch = useAppDispatch();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const {users, currentPage, totalCount, pageSize} = useAppSelector(state => state.users);

  useEffect(() => {
    setSearchParams({page: String(currentPage)});
    dispatch(getUsersDataTC('', true));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    const pageNumber = location.search.replace(/\D/g, '');
    if (pageNumber && pageNumber !== '0') dispatch(setCurrentPageAC(Number(pageNumber)));
  }, [searchParams])

  const followHandler = (userId: number) => {
    dispatch(followOrUnfollowTC(userId, 'follow'));
  }
  const unfollowHandler = (userId: number) => {
    dispatch(followOrUnfollowTC(userId, 'unfollow'));
  }

  const changePageHandler = (page: number) => {
    dispatch(setCurrentPageAC(page));
  }
  const changeQuantityOfUsersHandler = (quantity: number) => {
    dispatch(setPageSizeAC(quantity));
  }

  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <div className={s.friendsMain}>
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
      <div className={s.friendPagination}>
        <Paginator currentPage={currentPage}
                   totalCount={totalCount}
                   pageSize={pageSize}
                   siblingCount={2}
                   onPageChange={changePageHandler}/>
        <SuperSelect options={[5, 10, 15, 50]}
                     value={pageSize}
                     onChangeOption={changeQuantityOfUsersHandler}/>
      </div>
    </div>
  );
};
