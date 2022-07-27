import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type C = 'default' | 'delete' | 'other'
type ButtonLoadPropsType = DefaultButtonPropsType & {
  isSpinner?: boolean
  color?: C
}
const colors: { [Key in C]: string } = {
  default: '#00ed64',
  delete: '#ef0c0c',
  other: '#034844',
}
export const Button: React.FC<ButtonLoadPropsType> = (
  {
    isSpinner,
    color = 'default',
    className,
    ...restProps
  }
) => {

  const finalStyle = `${s.btnStyle} ${isSpinner ? s.spinner : ''} ${className ? className : ""}`;
  const textColor = color === 'default' ? '' : '#FCFCFC';

  return (
    <button className={finalStyle}
            style={{backgroundColor: colors[color], color: textColor}}
            disabled={isSpinner} {...restProps}/>
  )
};