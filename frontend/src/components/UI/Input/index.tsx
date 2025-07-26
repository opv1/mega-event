import classnames from 'classnames'
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { EyeClosedIcon } from 'assets/icons/EyeClosedIcon'
import { EyeIcon } from 'assets/icons/EyeIcon'
import { inputMask } from 'helpers/inputMask'
import { InputValidateReturnType, inputValidate } from 'helpers/inputValidate'

import styles from './styles.module.scss'

const DEFAULT_MAX_LENGTH = 25

type ValidatePropsType = { name?: string; value?: string }

export type FormInputRefType = {
  validate: ({ name, value }: ValidatePropsType) => InputValidateReturnType
}

type InputPropsType = {
  validationRules: string
  onChangeMask?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = memo(
  forwardRef<FormInputRefType, InputPropsType>((props, ref) => {
    const { validationRules, onChangeMask, ...inputProps } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const [inputType, setInputType] = useState(inputProps.type)

    const classNameInput = classnames(styles.input, inputProps.className, {
      [styles.input_password]: inputProps.value,
    })

    const classNamePlaceholder = classnames(styles.placeholder, {
      [styles.placeholder_active]: inputProps.value,
    })

    const handleClickEye = useCallback(() => {
      if (inputType === 'password') {
        setInputType('text')
      } else {
        setInputType('password')
      }
    }, [inputType])

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
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
      },
      [onChangeMask, inputProps],
    )

    useImperativeHandle(ref, () => ({
      validate: ({ name, value }) =>
        inputValidate({
          validationRules,
          name: name ?? inputProps.name,
          value: value ?? inputProps.value,
        }),
    }))

    return (
      <div className={styles.box}>
        <input
          {...inputProps}
          ref={inputRef}
          className={classNameInput}
          onChange={handleChange}
          type={inputType}
          maxLength={inputProps.maxLength || DEFAULT_MAX_LENGTH}
        />
        <span className={classNamePlaceholder}>{inputProps.placeholder}</span>
        {inputProps.type === 'password' && (
          <button
            className={styles.button}
            type='button'
            onClick={handleClickEye}
          >
            {inputType === 'password' ? <EyeIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
    )
  }),
)
