import classnames from 'classnames'
import React, { memo } from 'react'

import styles from './styles.module.scss'

type FieldsetPropsType = {
  error: string
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>

export const Fieldset = memo((props: FieldsetPropsType) => {
  const { children, error, ...fieldsetProps } = props

  const classNameError = classnames(styles.error, {
    [styles.error_active]: error,
  })

  return (
    <fieldset {...fieldsetProps} className={styles.fieldset}>
      {children}
      <span className={classNameError}>{error}</span>
    </fieldset>
  )
})
