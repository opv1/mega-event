import React, { memo } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = (props) => {
  const { children, ...buttonProps } = props

  const classNameButton = classnames(styles.button, buttonProps.className)

  return (
    <button {...buttonProps} className={classNameButton}>
      {children}
    </button>
  )
}

export default memo(Button)
