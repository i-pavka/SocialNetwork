import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './SuperSelect.module.scss'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

export const SuperSelect: React.FC<SuperSelectPropsType> = (
  {
    options,
    onChange, onChangeOption,
    value,
    ...restProps
  }
) => {
  const mappedOptions: any[] = options && options.length > 0 ?
    options.map((el, id) => {
      return (
        <option key={`${el}-${id}`}>{el}</option>
      )
    }) : [];

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e)
    onChangeOption && onChangeOption(e.currentTarget.value)
  }

  return (
    <select value={value}
            onChange={onChangeCallback}
            className={s.selectMainBlock}
            {...restProps}>
      {mappedOptions}
    </select>
  )
}
