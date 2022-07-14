import React, {useEffect} from 'react';
import s from './Snackbar.module.scss'
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../m2-bll/store";
import {setAppErrorAC} from "../../../../m2-bll/appReducer";


export const Snackbar = () => {
  const dispatch = useDispatch();
  const error = useAppSelector<string | null>(state => state.app.appError);

  useEffect(() => {
    const timerID = setTimeout(() => {
      dispatch(setAppErrorAC(null));
    }, 10000);
    return () => {
      clearTimeout(timerID);
    }
  }, [dispatch, error]);


  const closingHandler = () => {
    dispatch(setAppErrorAC(null))
  }

  return (
    <>
      {error && <div className={s.snackbar}>
        {error}
        <div onClick={closingHandler} className={s.close}></div>
      </div>}
    </>
  );
};

