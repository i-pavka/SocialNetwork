import React, {useEffect, useId, useState} from 'react';
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


export const Users = () => {

  const dispatch = useAppDispatch();
  const keyId = useId();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const users = useAppSelector(state => state.users.users);
  const {currentPage, totalCount, pageSize} = useAppSelector(state => state.users);

  useEffect(() => {
    setSearchParams({page: String(currentPage)})
    dispatch(getUsersDataTC(search));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    const pageNumber = location.search.replace(/\D/g, '');
    if(pageNumber && pageNumber !== '0') dispatch(setCurrentPageAC(Number(pageNumber)));
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
        {users.map((el, index) => {
          return (
            <User key={`${keyId}-${index.toString()}`}
                  users={el}/>
          )
        })}
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
    </section>
  );
};
