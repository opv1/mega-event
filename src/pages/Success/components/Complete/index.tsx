import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import styles from './styles.module.scss'

export const Complete: React.FC = () => {
  const { data } = useAppSelector((state) => state.app)

  console.log(data)

  return (
    <div className={styles.complete}>
      <div className={styles.field}>
        <span className={styles.title}>ФИО</span>
        <span className={styles.subtitle}>{data.name}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Тип участника</span>
        <span className={styles.subtitle}>{data.type}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Номер телфона</span>
        <span className={styles.subtitle}>{data.phone}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Дата рождения</span>
        <span className={styles.subtitle}>{data.birthday}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Опции</span>
        <span className={styles.subtitle}>
          Нужна парковка Хочу получить раздаточный материал Нужна помощь
          сопровождающего
        </span>
      </div>
    </div>
  )
}
