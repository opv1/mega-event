import React from 'react'

import s from './styles.module.scss'

type CheckboxPropsType = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = (props: CheckboxPropsType) => {
  return (
    <div className={s.box}>
      <input {...props} className={s.input} type='checkbox' />
      <div className={s.checkbox} />
    </div>
  )
}
