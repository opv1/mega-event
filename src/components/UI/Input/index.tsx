import React, { memo, useState } from 'react'
import styles from './styles.module.scss'

interface IComponent extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IComponent> = (props) => {
  return <input {...props} className={styles.input} />
}

export default memo(Input)
