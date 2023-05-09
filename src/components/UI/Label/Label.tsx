import React, { memo } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  direction: 'row' | 'column'
} & React.LabelHTMLAttributes<HTMLLabelElement>

const Label: React.FC<Props> = (props) => {
  const { direction, children, ...labelProps } = props

  const classNameLabel = classnames(styles.label, {
    [styles.label_column]: direction === 'column',
  })

  return (
    <label {...labelProps} className={classNameLabel}>
      {children}
    </label>
  )
}

export default memo(Label)
