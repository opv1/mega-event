import React, { forwardRef, memo, useImperativeHandle } from 'react'
import { inputValidate } from '../../../helpers/inputValidate'
import styles from './styles.module.scss'

type Props = {
  validationRules: string
  ref: any
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = forwardRef((props, ref) => {
  const { validationRules, ...inputProps } = props

  useImperativeHandle(ref, () => {
    return {
      validate: () =>
        inputValidate(validationRules, inputProps.name, inputProps.value),
    }
  })

  return <input {...inputProps} className={styles.input} />
})

export default memo(Input)
