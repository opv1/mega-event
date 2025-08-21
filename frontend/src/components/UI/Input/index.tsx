import cn from 'classnames'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { EyeClosedIcon } from '@assets/icons/EyeClosedIcon'
import { EyeIcon } from '@assets/icons/EyeIcon'
import { inputMask } from '@helpers/inputMask'
import { InputValidateReturnType, inputValidate } from '@helpers/inputValidate'

import s from './styles.module.scss'

const DEFAULT_MAX_LENGTH = 25

type ValidatePropsType = { name?: string; value?: string }

export type FormInputRefType = {
  validate: ({ name, value }: ValidatePropsType) => InputValidateReturnType
}

type InputPropsType = {
  validationRules: string
  onChangeMask?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<FormInputRefType, InputPropsType>(
  (props, ref) => {
    const { validationRules, onChangeMask, ...inputProps } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const [inputType, setInputType] = useState(inputProps.type)

    const handleClickEye = () => {
      if (inputType === 'password') {
        setInputType('text')
      } else {
        setInputType('password')
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeMask) {
        const { value } = event.target

        if (inputProps.name === 'birthday') {
          const valueMask = inputMask(value, '__.__.____')
          onChangeMask(valueMask)
        }

        if (inputProps.name === 'phone') {
          const valueMask = inputMask(value, '+7 (___) ___-__-__')
          onChangeMask(valueMask)
        }
      } else if (inputProps.onChange) {
        inputProps.onChange(event)
      }
    }

    useImperativeHandle(ref, () => ({
      validate: ({ name, value }) =>
        inputValidate({
          validationRules,
          name: name ?? inputProps.name,
          value: value ?? inputProps.value,
        }),
    }))

    return (
      <div className={s.box}>
        <input
          {...inputProps}
          ref={inputRef}
          className={cn(s.input, inputProps.className, {
            [s.input_password]: inputProps.value,
          })}
          onChange={handleChange}
          type={inputType}
          maxLength={inputProps.maxLength || DEFAULT_MAX_LENGTH}
        />
        <span
          className={cn(s.placeholder, {
            [s.placeholder_active]: inputProps.value,
          })}
        >
          {inputProps.placeholder}
        </span>
        {inputProps.type === 'password' && (
          <button className={s.button} type='button' onClick={handleClickEye}>
            {inputType === 'password' ? <EyeIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
    )
  },
)
