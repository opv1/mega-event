import React, { memo } from 'react'

import styles from './styles.module.scss'

type FormPropsType = React.FormHTMLAttributes<HTMLFormElement>

export const Form = memo((props: FormPropsType) => {
  const { children, ...formProps } = props

  return (
    <form {...formProps} className={styles.form}>
      {children}
    </form>
  )
})
