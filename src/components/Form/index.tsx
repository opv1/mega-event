import React from 'react'
import styles from './styles.module.scss'

interface FormProps {
  onSubmit: () => void
  children: React.ReactNode
}

const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, children } = props

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
