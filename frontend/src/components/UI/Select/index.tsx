import cn from 'classnames'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import { CaretIcon } from '@assets/icons/CaretIcon'
import { getDates } from '@helpers/getDates'
import { inputValidate } from '@helpers/inputValidate'

import s from './styles.module.scss'

type SelectPropsType = {
  onChange: (date: string) => void
  onFocus: (name: string) => void
  name: string
  value: string
  placeholder: string
  validationRules: string
}

export const Select = forwardRef((props: SelectPropsType, ref) => {
  const { onChange, onFocus, name, value, placeholder, validationRules } = props

  const selectRef = useRef<HTMLDivElement>(null)

  const [isShowOptions, setIsShowOptions] = useState(false)
  const [optionIndex, setOptionIndex] = useState(0)

  const dates = useMemo(() => getDates(), [])

  const handleToggle = () => {
    setIsShowOptions((prev) => !prev)
  }

  const handleBlur = () => {
    setIsShowOptions(false)
  }

  const handleChange = useCallback(() => {
    if (dates[optionIndex] === value) {
      onChange('')
    } else {
      onChange(dates[optionIndex])
    }
  }, [dates, onChange, optionIndex, value])

  const handleClickValue = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    onFocus(name)
    handleToggle()
  }

  const handleMouseEnter = useCallback((index: number) => {
    setOptionIndex(index)
  }, [])

  const handleClickOption = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.stopPropagation()

      handleChange()
      handleToggle()
    },
    [handleChange],
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
            const newOptionIndex = optionIndex + (code === 'ArrowDown' ? 1 : -1)

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
    [dates, handleChange, isShowOptions, optionIndex],
  )

  const optionNodes = useMemo(
    () =>
      dates.map((date, index) => (
        <li
          key={index}
          className={cn(s.option, {
            [s.option_active]: date === value,
            [s.option_focus]: index === optionIndex,
          })}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={(event) => handleClickOption(event)}
        >
          {date}
        </li>
      )),
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
    const selectRefCurrent = selectRef.current

    if (selectRefCurrent) {
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
      className={s.select}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <span
        id='date'
        className={cn(s.value, { [s.value_focus]: isShowOptions })}
        onClick={handleClickValue}
      >
        {value}
      </span>
      <span
        className={cn(s.placeholder, {
          [s.placeholder_active]: isShowOptions || value,
        })}
      >
        {placeholder}
      </span>
      <div className={cn(s.icon, { [s.icon_rotate]: isShowOptions })}>
        <CaretIcon />
      </div>
      <ul className={cn(s.options, { [s.options_display]: isShowOptions })}>
        {optionNodes}
      </ul>
    </div>
  )
})
