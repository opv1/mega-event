import React, { memo } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import styles from './styles.module.scss'

const Complete: React.FC = () => {
  const { data } = useAppSelector((state) => state.app)

  const participantType = data.type === 'individual' ? 'Физ. лицо' : 'Юр. лицо'

  return (
    <div className={styles.complete}>
      <div className={styles.field}>
        <span className={styles.title}>ФИО</span>
        <span className={styles.subtitle}>{data.name}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Тип участника</span>
        <span className={styles.subtitle}>{participantType}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>День мероприятия</span>
        <span className={styles.subtitle}>{data.date}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Номер телфона</span>
        <span className={styles.subtitle}>{data.phone}</span>
      </div>
      {data.birthday && (
        <div className={styles.field}>
          <span className={styles.title}>Дата рождения</span>
          <span className={styles.subtitle}>{data.birthday}</span>
        </div>
      )}
      {data.position && (
        <div className={styles.field}>
          <span className={styles.title}>Должность</span>
          <span className={styles.subtitle}>{data.position}</span>
        </div>
      )}
      {Object.entries(data.options).length !== 0 && (
        <div className={styles.field}>
          <span className={styles.title}>Опции</span>
          {Object.entries(data.options).map(([key, value]) => {
            if (value && key === 'parking') {
              return (
                <span key={key} className={styles.subtitle}>
                  Нужна парковка
                </span>
              )
            } else if (value && key === 'handout') {
              return (
                <span key={key} className={styles.subtitle}>
                  Хочу получить раздаточный материал
                </span>
              )
            } else if (value && key === 'help') {
              return (
                <span key={key} className={styles.subtitle}>
                  Нужна помощь сопровождающего
                </span>
              )
            } else {
              return null
            }
          })}
        </div>
      )}
    </div>
  )
}

export default memo(Complete)
