import React from 'react'
import Styles from './styles.module.scss'

interface FormProps {
  children: React.ReactNode
}

const Form: React.FC<FormProps> = (props) => {
  const { children } = props

  return <form className={Styles.form}>{children}</form>
}

export default Form
