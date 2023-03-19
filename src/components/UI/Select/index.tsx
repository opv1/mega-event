import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import inputValidate from '../../../helpers/inputValidate'
import getDates from '../../../helpers/getDates'
import CaretIcon from '../../../assets/CaretIcon'
import styles from './styles.module.scss'

type Props = {
  onClick: (date: string) => void
  onFocus: (name: string) => void
  name: string
  value: string
  placeholder: string
  validationRules: string
  ref: any
}

const Select: React.FC<Props> = forwardRef((props, ref) => {
  const { onClick, onFocus, name, value, placeholder, validationRules } = props

  const selectRef = useRef<HTMLDivElement>(null)

  const [isShowOptions, setIsShowOptions] = useState<boolean>(false)

  const classNameValue = classnames(styles.value, {
    [styles.value_focus]: isShowOptions,
  })

  const classNamePlaceholder = classnames(styles.placeholder, {
    [styles.placeholder_active]: isShowOptions || value,
  })

  const classNameIcon = classnames(styles.icon, {
    [styles.icon_rotate]: isShowOptions,
  })

  const classNameOptions = classnames(styles.options, {
    [styles.options_display]: isShowOptions,
  })

  const toggleOptions = useCallback(() => {
    setIsShowOptions((prev) => !prev)
  }, [])

  const handleClickValue = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation()

      onFocus(name)
      toggleOptions()
    },
    [name, onFocus, toggleOptions],
  )

  const handleClickOption = useCallback(
    (event: React.MouseEvent<HTMLLIElement>, date: string) => {
      event.stopPropagation()

      if (date === value) {
        onClick('')
      } else {
        onClick(date)
      }

      toggleOptions()
    },
    [value, onClick, toggleOptions],
  )

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (selectRef.current) {
        const selectElement = selectRef.current
        const target = event.target as Element
        const isClickOutside = !selectElement.contains(target)

        if (isClickOutside) {
          toggleOptions()
        }
      }
    },
    [toggleOptions],
  )

  const handleKeyupDocument = useCallback(
    (event: KeyboardEvent) => {
      if (isShowOptions && event.code === 'Tab') {
        toggleOptions()
      }
    },
    [isShowOptions, toggleOptions],
  )

  const handleKeyupSelect = useCallback(
    (event: KeyboardEvent) => {
      if (!isShowOptions && event.code === 'Space') {
        toggleOptions()
      }
    },
    [isShowOptions, toggleOptions],
  )

  const dates = useMemo(() => getDates(), [])

  const optionNodes = useMemo(
    () =>
      dates.map((date, index) => (
        <li
          key={index}
          className={`${styles.option} ${
            date === value && styles['option_active']
          }`}
          onClick={(event) => handleClickOption(event, date)}
        >
          {date}
        </li>
      )),
    [dates, value, handleClickOption],
  )

  useImperativeHandle(ref, () => {
    return {
      validate: () => inputValidate(validationRules, name, value),
    }
  })

  useEffect(() => {
    let selectRefCurrent: HTMLDivElement | null = null

    if (selectRef.current) {
      selectRefCurrent = selectRef.current
      selectRefCurrent.addEventListener('keyup', handleKeyupSelect)
    }

    return () => {
      if (selectRefCurrent) {
        selectRefCurrent.removeEventListener('keyup', handleKeyupSelect)
      }
    }
  }, [handleKeyupSelect])

  useEffect(() => {
    if (isShowOptions) {
      document.addEventListener('click', handleClickOutside, true)
      document.addEventListener('keyup', handleKeyupDocument)
    } else {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keyup', handleKeyupDocument)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keyup', handleKeyupDocument)
    }
  }, [isShowOptions, handleClickOutside, handleKeyupDocument])

  return (
    <div className={styles.select} ref={selectRef} tabIndex={0}>
      <span className={classNameValue} onClick={handleClickValue}>
        {value}
      </span>
      <span className={classNamePlaceholder}>{placeholder}</span>
      <div className={classNameIcon}>
        <CaretIcon />
      </div>
      <ul className={classNameOptions}>{optionNodes}</ul>
    </div>
  )
})

export default memo(Select)
