import React from 'react'
import styles from './styles.module.scss'

interface IComponent extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<IComponent> = (props) => {
  return (
    <>
      <input {...props} className={styles.input} type='checkbox' />
      <div className={styles.checkbox}></div>
    </>
  )
}

export default Checkbox
