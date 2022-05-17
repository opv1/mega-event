import React from 'react'
import Styles from './styles.module.scss'

interface FieldsetProps {
  placeholder: string
  value: string
  error?: string
  children: React.ReactNode
}

const Fieldset: React.FC<FieldsetProps> = (props) => {
  const { placeholder, value, error, children } = props

  return (
    <fieldset className={Styles.fieldset}>
      <label className={Styles.label}>
        {children}
        <span className={value ? `${Styles.placeholder} ${Styles.placeholder_active}` : `${Styles.placeholder}`}>
          {placeholder}
        </span>
      </label>
      <span className={error ? `${Styles.error} ${Styles.error_active}` : `${Styles.error}`}>{error}</span>
    </fieldset>
  )
}

export default Fieldset
