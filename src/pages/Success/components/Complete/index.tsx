import React, { memo } from 'react'

import { useAppSelector } from 'state/hooks'

import { MEMBER_VALUES } from 'const'

import { Options } from '../Options'

import styles from './styles.module.scss'

export const Complete = memo(() => {
  const { data } = useAppSelector((state) => state.app)

  return (
    <div className={styles.complete}>
      <div className={styles.field}>
        <span className={styles.title}>ФИО</span>
        <span className={styles.subtitle}>{data.name}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Тип участника</span>
        <span className={styles.subtitle}>{MEMBER_VALUES[data.type]}</span>
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
      <div className={styles.field}>
        <span className={styles.title}>Опции</span>
        <Options />
      </div>
    </div>
  )
})
