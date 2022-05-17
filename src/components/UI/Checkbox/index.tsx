import React from 'react'
import Styles from './styles.module.scss'

interface CheckboxProps {
  label: string
  onChange: any
  name: string
  checked: boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, onChange, name, checked } = props

  return (
    <label className={Styles.label}>
      <input className={Styles.input} onChange={onChange} type='checkbox' name={name} checked={checked} />
      <span className={Styles.checkbox}></span>
      {label}
    </label>
  )
}

export default Checkbox
