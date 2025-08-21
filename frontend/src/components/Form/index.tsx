import React from 'react'

import s from './styles.module.scss'

type FormPropsType = React.FormHTMLAttributes<HTMLFormElement>

export const Form = (props: FormPropsType) => {
  const { children, ...formProps } = props

  return (
    <form className={s.form} {...formProps}>
      {children}
    </form>
  )
}
