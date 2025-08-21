import cn from 'classnames'
import React from 'react'

import s from './styles.module.scss'

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonPropsType) => {
  const { children, ...buttonProps } = props

  return (
    <button {...buttonProps} className={cn(s.button, buttonProps.className)}>
      {children}
    </button>
  )
}
