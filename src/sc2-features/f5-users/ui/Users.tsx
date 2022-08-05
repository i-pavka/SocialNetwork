import React, {useEffect, useState} from 'react';
import s from './Users.module.scss';
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {getUsersDataTC, setCurrentPageAC, setPageSizeAC} from "../bll/usersReducer";
import {Paginator} from "./Paginator/Paginator";
import {SuperSelect} from "../../../sc1-main/m1-ui/common/components/SuperSelect/SuperSelect";
import {Button} from "../../../sc1-main/m1-ui/common/components/Button/Button";
import {scrollTop} from "../../../sc3-utils/utilityFunctions";
import {User} from "./User/User";
import {SearchUsers} from "./SearchUsers/SearchUsers";
import {useLocation, useSearchParams} from "react-router-dom";
import {InfoHeader} from "../../../sc1-main/m1-ui/common/components/InfoHeader/InfoHeader";


export const Users = () => {

  const dispatch = useAppDispatch();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const {currentPage, totalCount, pageSize} = useAppSelector(state => state.users);

  useEffect(() => {
    setSearchParams({page: String(currentPage)});
    dispatch(getUsersDataTC(search));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentPageAC(1));
      dispatch(setPageSizeAC(15));
    }
  }, [dispatch]);

  useEffect(() => {
    const pageNumber = location.search.replace(/\D/g, '');
    if (pageNumber && pageNumber !== '0') dispatch(setCurrentPageAC(Number(pageNumber)));
  }, [searchParams])

  const changePageHandler = (page: number) => {
    dispatch(setCurrentPageAC(page));
  }

  const changeQuantityOfUsersHandler = (quantity: number) => {
    dispatch(setPageSizeAC(quantity));
    scrollTop();
  }

  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <section className={s.usersBlock}>
      <SearchUsers search={search}
                   setSearch={setSearch}/>
      <div className={s.usersMain}>
        <User/>
      </div>
      <div className={s.usersPagination}>
        <Button onClick={() => scrollTop()}>&#11014; top</Button>
        <Paginator currentPage={currentPage}
                   totalCount={totalCount}
                   pageSize={pageSize}
                   siblingCount={2}
                   onPageChange={changePageHandler}/>
        <SuperSelect options={[15, 25, 50, 100]}
                     value={pageSize}
                     onChangeOption={changeQuantityOfUsersHandler}/>
      </div>
      <InfoHeader title={`Total users: ${totalCount}`}/>
    </section>
  );
};
