import React from 'react';
import {useFormik} from "formik";
import s from "../Login.module.scss";
import {Button} from "../../../../../sc1-main/m1-ui/common/components/Button/Button";
import {CheckBox} from "../../../../../sc1-main/m1-ui/common/components/CheckBox/CheckBox";
import {InputText} from "../../../../../sc1-main/m1-ui/common/components/InputText/InputText";
import {InputPassword} from "../../../../../sc1-main/m1-ui/common/components/InputPassword/InputPassword";
import {authLoginTC} from "../../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../../../sc1-main/m2-bll/store";

export type FormType = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {

  const dispatch = useAppDispatch();
  const {appIsLoading, appError} = useAppSelector(state => state.app);

  const formik = useFormik({

    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    validate: (values) => {
      const errors = {} as FormType;

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.trim().length < 2) {
        errors.password = "Min 2 symbols"
      }

      return errors;
    },

    onSubmit: values => {
      dispatch(authLoginTC(values));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <div className={s.itemInputBlock}>
          <InputText placeholder={'Email'}
                     {...formik.getFieldProps('email')}/>
          {formik.touched.email && formik.errors.email &&
            <div>{formik.errors.email}</div>}
        </div>
        <div className={s.itemInputBlock}>
          <InputPassword placeholder={'Password'}
                     {...formik.getFieldProps('password')}/>
          {formik.touched.password && formik.errors.password &&
            <div>{formik.errors.password}</div>}
        </div>
        <div className={s.checkBox}>
          <CheckBox {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}>
            remember me
          </CheckBox>
        </div>

        <div className={s.infoDiv}>
         {appError}
        </div>

        <Button isSpinner={appIsLoading} type={'submit'}>Login</Button>
    </form>
  )
}
