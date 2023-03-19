import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import classnames from 'classnames'
import inputValidate from '../../../helpers/inputValidate'
import inputMask from '../../../helpers/inputMask'
import EyeIcon from '../../../assets/EyeIcon'
import EyeClosedIcon from '../../../assets/EyeClosedIcon'
import styles from './styles.module.scss'

type Props = {
  onChangeMask?: (value: string) => void
  validationRules: string
  ref: any
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = forwardRef((props, ref) => {
  const { onChangeMask, validationRules, className, ...inputProps } = props

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
        inputValidate(validationRules, inputProps.name, inputProps.value),
    }
  })

  return (
    <div className={styles.box}>
      <input
        {...inputProps}
        className={classNameInput}
        onChange={handleChange}
        type={inputType}
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
})

export default memo(Input)
