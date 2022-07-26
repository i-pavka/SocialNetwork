import React, {useEffect, useId} from 'react';
import s from './Users.module.scss';
import {MainSpinner} from "../../../sc1-main/m1-ui/common/components/MainSpinner/MainSpinner";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {getUsersDataTC} from "../bll/usersReducer";
import {User} from "../User/User";



export const Users = () => {

  const dispatch = useAppDispatch();
  const keyId = useId();

  const isLoading = useAppSelector(state => state.app.appIsLoading);
  const users = useAppSelector(state => state.users.users);

  useEffect(() => {
    dispatch(getUsersDataTC());
  }, [dispatch]);


  if (isLoading) {
    return <MainSpinner/>
  }

  return (
    <div className={s.usersMain}>
        {users.map((el, index) => {
          return (
            <User key={`${keyId}-${index.toString()}`}
                  users={el}/>
          )
        })}
    </div>
  );
};
