import React, {useEffect} from 'react';
import s from './Friends.module.scss';
import {getUsersDataTC, setCurrentPageAC, setPageSizeAC} from "../../f5-users/bll/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {Paginator} from "../../f5-users/ui/Paginator/Paginator";
import {SuperSelect} from "../../../sc1-main/m1-ui/common/components/SuperSelect/SuperSelect";
import {useLocation, useSearchParams} from "react-router-dom";
import {Friend} from "./Friend/Friend";


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

  useEffect(() => {
    return () => {
      dispatch(setCurrentPageAC(1));
      dispatch(setPageSizeAC(15));
    }
  }, [dispatch]);

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
      {users.length === 0
        ? <h3>Unfortunately you don't have any friends</h3>
        : <>
          <Friend users={users}/>
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
        </>
      }
    </div>
  );
};
