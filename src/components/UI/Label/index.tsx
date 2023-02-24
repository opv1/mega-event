import React, { memo } from 'react'
import styles from './styles.module.scss'

//TODO direction

type Props = {} & React.LabelHTMLAttributes<HTMLLabelElement>

const Label: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <label {...props} className={styles.label}>
      {children}
    </label>
  )
}

export default memo(Label)
