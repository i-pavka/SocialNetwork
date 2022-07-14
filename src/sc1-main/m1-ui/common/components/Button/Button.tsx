import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type C = 'default' | 'delete' | 'other'
type ButtonLoadPropsType = DefaultButtonPropsType & {
  red?: boolean
  isSpinner?: boolean
  color?: C
}
const colors: { [Key in C]: string } = {
  default: '#00ed64',
  delete: '#ef0c0c',
  other: '#023430',
}
export const Button: React.FC<ButtonLoadPropsType> = (
  {
    red,
    isSpinner,
    color = 'default',
    className,
    ...restProps
  }
) => {

  const finalStyle = `${s.btnStyle} ${isSpinner ? s.spinner : ''} ${red ? s.red : ""} ${className ? className : ""}`;

  return (
    <button className={finalStyle}
            style={{backgroundColor: colors[color]}}
            disabled={isSpinner} {...restProps}/>
  )
};