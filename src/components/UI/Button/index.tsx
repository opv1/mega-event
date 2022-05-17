import React from 'react'
import Styles from './styles.module.scss'

interface ButtonProps {
  title: string
  onClick: any
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const { title, onClick, disabled } = props

  return (
    <button className={Styles.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  )
}

export default Button
