import React, { memo } from 'react'
import styles from './styles.module.scss'

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox: React.FC<Props> = (props) => {
  return (
    <div className={styles.box}>
      <input {...props} className={styles.input} type='checkbox' />
      <div className={styles.checkbox}></div>
    </div>
  )
}

export default memo(Checkbox)
