import React, { useState } from 'react'
import arrowIcon from '../../../assets/arrow-down.svg'
import Styles from './styles.module.scss'

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
    <div className={Styles.select}>
      <span className={Styles.selected} onClick={toggleDates}>
        {selectedDate.data || 'День мероприятия'}
      </span>
      <img
        className={
          displayDates
            ? `${Styles.arrow} ${Styles.arrow_rotate}`
            : `${Styles.arrow}`
        }
        src={arrowIcon}
        alt='Иконка'
      />
      <div
        className={
          displayDates
            ? `${Styles.options} ${Styles.options_display}`
            : `${Styles.options}`
        }
      >
        {data.map((date) => (
          <span
            key={date.id}
            className={Styles.option}
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
