import React, { memo } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = (props) => {
  const { className, children } = props

  const classNameButton = classnames(styles.button, className)

  return (
    <button {...props} className={classNameButton}>
      {children}
    </button>
  )
}

export default memo(Button)
