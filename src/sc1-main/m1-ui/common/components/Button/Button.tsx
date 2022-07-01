import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonLoadPropsType = DefaultButtonPropsType & {
  red?: boolean
  isSpinner?: boolean;
}

export const Button: React.FC<ButtonLoadPropsType> = (
  {
    red,
    isSpinner,
    className,
    ...restProps
  }
) => {

  const finalStyle = `${s.btnStyle} ${isSpinner ? s.spinner : ''} ${red ? s.red : ""} ${className ? className : ""}`;

  return (
    <button className={finalStyle} disabled={isSpinner} {...restProps}/>
  )
};