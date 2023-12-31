import classnames from 'classnames'
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

import { EyeClosedIcon } from 'assets/icons/EyeClosedIcon'
import { EyeIcon } from 'assets/icons/EyeIcon'
import { inputMask } from 'helpers/inputMask'
import { inputValidate } from 'helpers/inputValidate'

import styles from './styles.module.scss'

const DEFAULT_MAX_LENGTH = 25

type InputPropsType = {
  validationRules: string
  onChangeMask?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = memo(
  forwardRef((props: InputPropsType, ref) => {
    const { validationRules, onChangeMask, className, ...inputProps } = props

    const [inputType, setInputType] = useState<
      React.HTMLInputTypeAttribute | undefined
    >(inputProps.type)

    const classNameInput = classnames(styles.input, className, {
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

    useImperativeHandle(ref, () => {
      return {
        validate: () =>
          inputValidate({
            validationRules,
            name: inputProps.name,
            value: inputProps.value,
          }),
      }
    })

    return (
      <div className={styles.box}>
        <input
          {...inputProps}
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
