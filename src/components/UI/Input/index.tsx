import React, { useState } from 'react'
import Styles from './styles.module.scss'

interface InputProps {
  onChange: any
  type: string
  name: string
  value: string
}

const Input: React.FC<InputProps> = (props) => {
  const { onChange, type, name, value } = props

  const [currentType, setCurrentType] = useState(type)

  const toggleEye = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (currentType === 'password') {
      setCurrentType('text')
    } else {
      setCurrentType('password')
    }
  }

  return (
    <>
      <input
        className={Styles.input}
        onChange={onChange}
        type={currentType}
        name={name}
        value={value}
      />
      {type === 'password' && (
        <button
          className={
            currentType === 'password'
              ? `${Styles.toggle}`
              : `${Styles.toggle} ${Styles.toggle_hide}`
          }
          onClick={toggleEye}
        />
      )}
    </>
  )
}

export default Input
