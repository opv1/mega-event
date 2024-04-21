import React, { memo } from 'react'

import { selectAppInfo } from 'state/app/selectors'
import { useAppSelector } from 'state/hooks'

import { MEMBER_VALUES } from 'const'

import { Options } from '../Options'

import styles from './styles.module.scss'

export const Complete = memo(() => {
  const appInfo = useAppSelector(selectAppInfo)

  return (
    <div className={styles.complete}>
      <div className={styles.field}>
        <span className={styles.title}>ФИО</span>
        <span className={styles.subtitle}>{appInfo.name}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Тип участника</span>
        <span className={styles.subtitle}>{MEMBER_VALUES[appInfo.type]}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>День мероприятия</span>
        <span className={styles.subtitle}>{appInfo.date}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Номер телфона</span>
        <span className={styles.subtitle}>{appInfo.phone}</span>
      </div>
      {appInfo.birthday && (
        <div className={styles.field}>
          <span className={styles.title}>Дата рождения</span>
          <span className={styles.subtitle}>{appInfo.birthday}</span>
        </div>
      )}
      {appInfo.position && (
        <div className={styles.field}>
          <span className={styles.title}>Должность</span>
          <span className={styles.subtitle}>{appInfo.position}</span>
        </div>
      )}
      <div className={styles.field}>
        <span className={styles.title}>Опции</span>
        <Options />
      </div>
    </div>
  )
})
