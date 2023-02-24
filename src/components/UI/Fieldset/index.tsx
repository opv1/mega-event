import React, { memo } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

interface FieldsetProps {
  placeholder?: string
  value: string
  error: string
  children: React.ReactNode
}

const Fieldset: React.FC<FieldsetProps> = (props) => {
  const { placeholder, value, error, children } = props

  const classNamePlaceholder = classnames(styles.placeholder, {
    [styles.placeholder_active]: value?.length !== 0,
  })

  const classNameError = classnames(styles.error, {
    [styles.error_active]: error.length !== 0,
  })

  return (
    <fieldset className={styles.fieldset}>
      <div className={styles.content}>
        {children}
        {placeholder && (
          <span className={classNamePlaceholder}>{placeholder}</span>
        )}
      </div>
      <span className={classNameError}>{error}</span>
    </fieldset>
  )
}

export default memo(Fieldset)
