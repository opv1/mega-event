import React, { forwardRef, memo, useImperativeHandle } from 'react'
import classnames from 'classnames'
import { inputValidate } from '../../../helpers/inputValidate'
import styles from './styles.module.scss'

type Props = {
  validationRules: string
  ref: any
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = forwardRef((props, ref) => {
  const { validationRules, ...inputProps } = props

  const classNamePlaceholder = classnames(styles.placeholder, {
    [styles.placeholder_active]: inputProps.value,
  })

  useImperativeHandle(ref, () => {
    return {
      validate: () =>
        inputValidate(validationRules, inputProps.name, inputProps.value),
    }
  })

  return (
    <div className={styles.box}>
      <input {...inputProps} className={styles.input} />
      <span className={classNamePlaceholder}>{inputProps.placeholder}</span>
    </div>
  )
})

export default memo(Input)
