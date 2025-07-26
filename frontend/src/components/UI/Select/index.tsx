import classnames from 'classnames'
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

import { CaretIcon } from 'assets/icons/CaretIcon'
import { getDates } from 'helpers/getDates'
import { inputValidate } from 'helpers/inputValidate'

import styles from './styles.module.scss'

type SelectPropsType = {
  onChange: (date: string) => void
  onFocus: (name: string) => void
  name: string
  value: string
  placeholder: string
  validationRules: string
}

export const Select = memo(
  forwardRef((props: SelectPropsType, ref) => {
    const { onChange, onFocus, name, value, placeholder, validationRules } =
      props

    const selectRef = useRef<HTMLDivElement>(null)

    const [isShowOptions, setIsShowOptions] = useState(false)
    const [optionIndex, setOptionIndex] = useState(0)

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

    const dates = useMemo(() => getDates(), [])

    const handleToggle = useCallback(() => {
      setIsShowOptions((prev) => !prev)
    }, [])

    const handleBlur = useCallback(() => {
      setIsShowOptions(false)
    }, [])

    const handleChange = useCallback(() => {
      if (dates[optionIndex] === value) {
        onChange('')
      } else {
        onChange(dates[optionIndex])
      }
    }, [value, optionIndex, dates, onChange])

    const handleClickValue = useCallback(
      (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation()

        onFocus(name)
        handleToggle()
      },
      [name, onFocus, handleToggle],
    )

    const handleMouseEnter = useCallback((index: number) => {
      setOptionIndex(index)
    }, [])

    const handleClickOption = useCallback(
      (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation()

        handleChange()
        handleToggle()
      },
      [handleChange, handleToggle],
    )

    const handleKeyupSelect = useCallback(
      (event: KeyboardEvent) => {
        const { code } = event

        switch (code) {
          case 'Tab':
            if (isShowOptions) {
              handleToggle()
            }
            break
          case 'Space':
            handleToggle()
            break
          case 'ArrowUp':
          case 'ArrowDown':
            if (isShowOptions) {
              const newOptionIndex =
                optionIndex + (code === 'ArrowDown' ? 1 : -1)

              if (newOptionIndex >= 0 && newOptionIndex < dates.length) {
                setOptionIndex(newOptionIndex)
              }
            }
            break
          case 'Enter':
            if (isShowOptions) {
              handleChange()
              handleToggle()
            }
            break
          default:
            break
        }
      },
      [isShowOptions, optionIndex, dates, handleChange, handleToggle],
    )

    const optionNodes = useMemo(
      () =>
        dates.map((date, index) => {
          const classNameOption = classnames(styles.option, {
            [styles.option_active]: date === value,
            [styles.option_focus]: index === optionIndex,
          })

          return (
            <li
              key={index}
              className={classNameOption}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={(event) => handleClickOption(event)}
            >
              {date}
            </li>
          )
        }),
      [dates, value, optionIndex, handleClickOption, handleMouseEnter],
    )

    useImperativeHandle(ref, () => {
      return {
        validate: () => inputValidate({ validationRules, name, value }),
      }
    })

    useEffect(() => {
      if (!isShowOptions) {
        setOptionIndex(0)
      }
    }, [isShowOptions])

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

    return (
      <div
        ref={selectRef}
        id='select'
        className={styles.select}
        onBlur={handleBlur}
        tabIndex={0}
      >
        <span id='date' className={classNameValue} onClick={handleClickValue}>
          {value}
        </span>
        <span className={classNamePlaceholder}>{placeholder}</span>
        <div className={classNameIcon}>
          <CaretIcon />
        </div>
        <ul className={classNameOptions}>{optionNodes}</ul>
      </div>
    )
  }),
)
