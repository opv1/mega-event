import React from 'react'
import styles from './styles.module.scss'

interface FieldsetProps {
  placeholder: string
  value: string
  error?: string
  children: React.ReactNode
}

const Fieldset: React.FC<FieldsetProps> = (props) => {
  const { placeholder, value, error, children } = props

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>
        {children}
        <span
          className={
            value
              ? `${styles.placeholder} ${styles.placeholder_active}`
              : `${styles.placeholder}`
          }
        >
          {placeholder}
        </span>
      </label>
      <span
        className={
          error ? `${styles.error} ${styles.error_active}` : `${styles.error}`
        }
      >
        {error}
      </span>
    </fieldset>
  )
}

export default Fieldset
