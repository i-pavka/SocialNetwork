import React from 'react';
import s from './MainSpinner.module.scss'

type SpinnerPropsType = {
  customMainStyle?: string
  customSizeStyle?: string
}

export const MainSpinner: React.FC<SpinnerPropsType> = (
  {
    customMainStyle,
    customSizeStyle,
  }
) => {

  const finalMainStyle = `${s.mainBlock} ${customMainStyle ? customMainStyle : ''}`
  const finalSizeStyle = `${s.speedingWheel} ${customSizeStyle ? customSizeStyle : ''}`

  return (
    <div className={finalMainStyle}>
      <div className={s.container}>
        <div className={finalSizeStyle}/>
      </div>
    </div>

  );
};

