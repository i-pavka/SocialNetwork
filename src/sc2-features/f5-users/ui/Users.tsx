import React, {useEffect, useId} from 'react';
import s from './Users.module.scss';
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {getUsersDataTC, setCurrentPageAC, setPageSizeAC} from "../bll/usersReducer";
import {User} from "./User/User";
import {Paginator} from "./Paginator/Paginator";
import {SuperSelect} from "../../../sc1-main/m1-ui/common/components/SuperSelect/SuperSelect";


export const Users = () => {

  const dispatch = useAppDispatch();
  const keyId = useId();

  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const users = useAppSelector(state => state.users.users);
  const {currentPage, totalCount, pageSize} = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsersDataTC());
  }, [dispatch, currentPage, pageSize]);

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
    <section className={s.usersBlock}>
      <div className={s.usersMain}>
        {users.map((el, index) => {
          return (
            <User key={`${keyId}-${index.toString()}`}
                  users={el}/>
          )
        })}
      </div>
      <div className={s.usersPagination}>
        <Paginator currentPage={currentPage}
                   totalCount={totalCount}
                   pageSize={pageSize}
                   siblingCount={2}
                   onPageChange={changePageHandler}
        />
        <SuperSelect options={[15, 25, 50, 100]}
                     value={pageSize}
                     onChangeOption={changeQuantityOfUsersHandler}
        />
      </div>

    </section>
  );
};
