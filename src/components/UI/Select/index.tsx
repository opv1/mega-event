import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import classnames from 'classnames'
import { inputValidate } from '../../../helpers/inputValidate'
import CaretIcon from '../../../assets/CaretIcon'
import styles from './styles.module.scss'

const dates = [
  { id: 1, data: '24-04-2021' },
  { id: 2, data: '07-05-2021' },
  { id: 3, data: '28-11-2021' },
  { id: 4, data: '29-02-2022' },
]

type Props = {
  onClick: any
  onFocus: any
  name: string
  value: string
  placeholder: string
  validationRules: string
  ref: any
}

const Select: React.FC<Props> = forwardRef((props, ref) => {
  const { onClick, onFocus, name, value, placeholder, validationRules } = props

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

  const toggleOptions = () => {
    onFocus(name)
    setIsShowOptions((prev) => !prev)
  }

  const handlerClick = (date: string) => {
    onClick(date)
    toggleOptions()
  }

  useImperativeHandle(ref, () => {
    return {
      validate: () => inputValidate(validationRules, name, value),
    }
  })

  return (
    <div className={styles.select}>
      <span className={classNameValue} onClick={toggleOptions}>
        {value}
      </span>
      <span className={classNamePlaceholder}>{placeholder}</span>
      <div className={classNameIcon}>
        <CaretIcon />
      </div>
      <div className={classNameOptions}>
        {dates.map((date) => (
          <span
            key={date.id}
            className={`${styles.option} ${
              date.data === value && styles['option_active']
            }`}
            onClick={() => handlerClick(date.data)}
          >
            {date.data}
          </span>
        ))}
      </div>
    </div>
  )
})

export default memo(Select)
