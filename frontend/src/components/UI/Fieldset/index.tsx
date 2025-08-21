import cn from 'classnames'
import React from 'react'

import s from './styles.module.scss'

type FieldsetPropsType = {
  error: string
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>

export const Fieldset = (props: FieldsetPropsType) => {
  const { children, error, ...fieldsetProps } = props

  return (
    <fieldset {...fieldsetProps} className={s.fieldset}>
      {children}
      <span className={cn(s.error, { [s.error_active]: error })}>{error}</span>
    </fieldset>
  )
}
