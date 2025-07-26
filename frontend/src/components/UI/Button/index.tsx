import classnames from 'classnames'
import React, { memo } from 'react'

import styles from './styles.module.scss'

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = memo((props: ButtonPropsType) => {
  const { children, ...buttonProps } = props

  const classNameButton = classnames(styles.button, buttonProps.className)

  return (
    <button {...buttonProps} className={classNameButton}>
      {children}
    </button>
  )
})
