import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import classnames from 'classnames'
import inputValidate from '../../../helpers/inputValidate'
import EyeIcon from '../../../assets/EyeIcon'
import EyeClosedIcon from '../../../assets/EyeClosedIcon'
import styles from './styles.module.scss'

type Props = {
  validationRules: string
  ref: any
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = forwardRef((props, ref) => {
  const { validationRules, className, ...inputProps } = props

  const [inputType, setInputType] = useState(inputProps.type)

  const classNameInput = classnames(styles.input, className, {
    [styles.input_password]: inputProps.value,
  })

  const classNamePlaceholder = classnames(styles.placeholder, {
    [styles.placeholder_active]: inputProps.value,
  })

  const handlerClickEye = () => {
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  useImperativeHandle(ref, () => {
    return {
      validate: () =>
        inputValidate(validationRules, inputProps.name, inputProps.value),
    }
  })

  return (
    <div className={styles.box}>
      <input {...inputProps} className={classNameInput} type={inputType} />
      <span className={classNamePlaceholder}>{inputProps.placeholder}</span>
      {inputProps.type === 'password' && (
        <button
          className={styles.button}
          type='button'
          onClick={handlerClickEye}
        >
          {inputType === 'password' ? <EyeIcon /> : <EyeClosedIcon />}
        </button>
      )}
    </div>
  )
})

export default memo(Input)
