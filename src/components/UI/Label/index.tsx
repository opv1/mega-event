import React from 'react'
import styles from './styles.module.scss'

interface IComponent extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

// diraction

export const Label: React.FC<IComponent> = (props) => {
  const { children } = props

  return (
    <label {...props} className={styles.label}>
      {children}
    </label>
  )
}
