import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import classnames from 'classnames'
import { inputValidate } from '../../../helpers/inputValidate'
import { dates } from '../../../consts'
import arrowIcon from '../../../assets/arrow-down.svg'
import styles from './styles.module.scss'

type Props = {
  onClick: any
  onFocus: any
  name: string
  value: string
  validationRules: string
  ref: any
}

const Select: React.FC<Props> = forwardRef((props, ref) => {
  const { onClick, onFocus, name, value, validationRules } = props

  const [isDisplay, setIsDisplay] = useState<boolean>(false)

  const classNameValue = classnames(styles.value, {
    [styles.value_focus]: isDisplay,
  })

  const classNameIcon = classnames(styles.arrow, {
    [styles.arrow_rotate]: isDisplay,
  })

  const classNameOptions = classnames(styles.options, {
    [styles.options_display]: isDisplay,
  })

  const toggleOptions = () => {
    onFocus(name)
    setIsDisplay((prev) => !prev)
  }

  const handlerClick = (date: string) => {
    onClick(date)
    toggleOptions()
  }

  // click outside

  useImperativeHandle(ref, () => {
    return {
      validate: () => inputValidate(validationRules, name, value),
    }
  })

  return (
    <div className={styles.select}>
      <span className={classNameValue} onClick={toggleOptions}>
        {value.length === 0 ? 'День мероприятия' : value}
      </span>
      <img className={classNameIcon} src={arrowIcon} alt='Иконка' />
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

export default Select
