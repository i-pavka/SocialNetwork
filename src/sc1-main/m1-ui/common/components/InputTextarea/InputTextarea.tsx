import React, {
  ChangeEvent,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
} from 'react';

import s from './InputTextarea.module.css';
import {utilityFunctions} from "../../../../../sc3-utils/utilityFunctions";

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement>;

type PropsType = DefaultTextareaPropsType & {
  label: string;
  onEnter?: () => void;
};

export const InputTextarea: React.FC<PropsType> = (
  {
    label,
    placeholder,
    onChange,
    ...restProps
  }
) => {
  const id = utilityFunctions();

  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange?.(e);
  };
  const containerStyle = restProps.value
    ? `${s.container} ${s.containerValue}`
    : s.container;

  return (
    <div className={placeholder ? s.containerPlace : containerStyle}>
      <textarea
        required
        id={id}
        placeholder={placeholder}
        onChange={onChangeCallback}
        {...restProps}
      />
      {!placeholder && <label htmlFor={id}>{label || ''}</label>}
    </div>
  );
};