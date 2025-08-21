import cn from 'classnames'
import React from 'react'

import s from './styles.module.scss'

export enum LABEL_DIRECTION {
  Row = 'row',
  Column = 'column',
}

type LabelPropsType = {
  direction: LABEL_DIRECTION.Row | LABEL_DIRECTION.Column
} & React.LabelHTMLAttributes<HTMLLabelElement>

export const Label = (props: LabelPropsType) => {
  const { children, direction, ...labelProps } = props

  return (
    <label
      {...labelProps}
      className={cn(s.label, {
        [s.label_column]: direction === LABEL_DIRECTION.Column,
      })}
    >
      {children}
    </label>
  )
}
