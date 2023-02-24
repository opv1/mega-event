import React from 'react'
import styles from './styles.module.scss'

export const Complete: React.FC = () => {
  return (
    <div className={styles.complete}>
      <div className={styles.field}>
        <span className={styles.title}>ФИО</span>
        <span className={styles.subtitle}>Иванов Иван Иванович</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Тип участника</span>
        <span className={styles.subtitle}>Физ. лицо</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Номер телфона</span>
        <span className={styles.subtitle}>+7 (999) 888-88-88</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Дата рождения</span>
        <span className={styles.subtitle}>15.04.2021</span>
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
