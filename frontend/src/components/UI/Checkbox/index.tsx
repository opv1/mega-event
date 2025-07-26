import React, { memo } from 'react'

import styles from './styles.module.scss'

type CheckboxPropsType = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = memo((props: CheckboxPropsType) => {
  return (
    <div className={styles.box}>
      <input {...props} className={styles.input} type='checkbox' />
      <div className={styles.checkbox} />
    </div>
  )
})
