import React, { memo } from 'react'
import styles from './styles.module.scss'

type Props = React.FormHTMLAttributes<HTMLFormElement>

const Form: React.FC<Props> = (props) => {
  const { children, ...formProps } = props

  return (
    <form {...formProps} className={styles.form}>
      {children}
    </form>
  )
}

export default memo(Form)
