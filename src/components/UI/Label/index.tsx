import React, { memo } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

export enum LabelDirection {
  Row = 'row',
  Column = 'column',
}

type LabelPropsType = {
  direction: LabelDirection.Row | LabelDirection.Column
} & React.LabelHTMLAttributes<HTMLLabelElement>

export const Label = memo((props: LabelPropsType) => {
  const { children, direction, ...labelProps } = props

  const classNameLabel = classnames(styles.label, {
    [styles.label_column]: direction === LabelDirection.Column,
  })

  return (
    <label {...labelProps} className={classNameLabel}>
      {children}
    </label>
  )
})
