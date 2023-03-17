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

  const handlerClickSelect = useCallback(() => {
    onFocus(name)
    toggleOptions()
  }, [name, onFocus, toggleOptions])

  const handlerClickValue = useCallback(
    (date: string) => {
      if (date === value) {
        onClick('')
      } else {
        onClick(date)
      }

      toggleOptions()
    },
    [value, onClick, toggleOptions],
  )

  const handlerClickOutside = useCallback(
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

  const handlerKeyupDocument = useCallback(
    (event: KeyboardEvent) => {
      if (isShowOptions && event.code === 'Tab') {
        toggleOptions()
      }
    },
    [isShowOptions, toggleOptions],
  )

  const handlerKeyupSelect = useCallback(
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
        <span
          key={index}
          className={`${styles.option} ${
            date === value && styles['option_active']
          }`}
          onClick={() => handlerClickValue(date)}
        >
          {date}
        </span>
      )),
    [dates, value, handlerClickValue],
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
      selectRefCurrent.addEventListener('keyup', handlerKeyupSelect)
    }

    return () => {
      if (selectRefCurrent) {
        selectRefCurrent.removeEventListener('keyup', handlerKeyupSelect)
      }
    }
  }, [handlerKeyupSelect])

  useEffect(() => {
    if (isShowOptions) {
      document.addEventListener('click', handlerClickOutside, true)
      document.addEventListener('keyup', handlerKeyupDocument)
    } else {
      document.removeEventListener('click', handlerClickOutside, true)
      document.removeEventListener('keyup', handlerKeyupDocument)
    }

    return () => {
      document.removeEventListener('click', handlerClickOutside, true)
      document.removeEventListener('keyup', handlerKeyupDocument)
    }
  }, [isShowOptions, handlerClickOutside, handlerKeyupDocument])

  return (
    <div className={styles.select} ref={selectRef} tabIndex={0}>
      <span className={classNameValue} onClick={handlerClickSelect}>
        {value}
      </span>
      <span className={classNamePlaceholder}>{placeholder}</span>
      <div className={classNameIcon}>
        <CaretIcon />
      </div>
      <div className={classNameOptions}>{optionNodes}</div>
    </div>
  )
})

export default memo(Select)
