import React, { useState } from 'react'
import arrowIcon from '../../../assets/arrow-down.svg'
import styles from './styles.module.scss'

interface SelectProps {
  data: any[]
}

const Select: React.FC<SelectProps> = (props) => {
  const { data } = props

  const [displayDates, setDisplayDates] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ data: '' })

  const toggleDates = () => setDisplayDates((prev) => !prev)

  const selectingDate = (date: any) => {
    setSelectedDate(date)
    toggleDates()
  }

  return (
    <div className={styles.select}>
      <span className={styles.selected} onClick={toggleDates}>
        {selectedDate.data || 'День мероприятия'}
      </span>
      <img
        className={
          displayDates
            ? `${styles.arrow} ${styles.arrow_rotate}`
            : `${styles.arrow}`
        }
        src={arrowIcon}
        alt='Иконка'
      />
      <div
        className={
          displayDates
            ? `${styles.options} ${styles.options_display}`
            : `${styles.options}`
        }
      >
        {data.map((date) => (
          <span
            key={date.id}
            className={styles.option}
            onClick={() => selectingDate(date)}
          >
            {date.data}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Select
