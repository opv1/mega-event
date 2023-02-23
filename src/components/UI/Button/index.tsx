import React, { memo } from 'react'
import styles from './styles.module.scss'

interface IComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<IComponent> = (props) => {
  const { children } = props

  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  )
}

export default memo(Button)
