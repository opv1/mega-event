import React, { memo } from 'react'
import styles from './styles.module.scss'

type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  )
}

export default memo(Button)
