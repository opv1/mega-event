import classnames from 'classnames'
import React, { memo } from 'react'

import styles from './styles.module.scss'

export enum LABEL_DIRECTION {
  row = 'row',
  column = 'column',
}

type LabelPropsType = {
  direction: LABEL_DIRECTION.row | LABEL_DIRECTION.column
} & React.LabelHTMLAttributes<HTMLLabelElement>

export const Label = memo((props: LabelPropsType) => {
  const { children, direction, ...labelProps } = props

  const classNameLabel = classnames(styles.label, {
    [styles.label_column]: direction === LABEL_DIRECTION.column,
  })

  return (
    <label {...labelProps} className={classNameLabel}>
      {children}
    </label>
  )
})
