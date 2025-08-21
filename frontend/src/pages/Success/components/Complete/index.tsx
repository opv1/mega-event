import React from 'react'

import { selectAppInfo } from '@state/app/selectors'
import { useAppSelector } from '@state/hooks'

import { MEMBER_VALUES } from '@constants'

import { Options } from '../Options'

import s from './styles.module.scss'

export const Complete = () => {
  const appInfo = useAppSelector(selectAppInfo)

  return (
    <div className={s.complete}>
      <div className={s.field}>
        <span className={s.title}>ФИО</span>
        <span className={s.subtitle}>{appInfo.name}</span>
      </div>
      <div className={s.field}>
        <span className={s.title}>Тип участника</span>
        <span className={s.subtitle}>{MEMBER_VALUES[appInfo.type]}</span>
      </div>
      <div className={s.field}>
        <span className={s.title}>День мероприятия</span>
        <span className={s.subtitle}>{appInfo.date}</span>
      </div>
      <div className={s.field}>
        <span className={s.title}>Номер телфона</span>
        <span className={s.subtitle}>{appInfo.phone}</span>
      </div>
      {appInfo.birthday && (
        <div className={s.field}>
          <span className={s.title}>Дата рождения</span>
          <span className={s.subtitle}>{appInfo.birthday}</span>
        </div>
      )}
      {appInfo.position && (
        <div className={s.field}>
          <span className={s.title}>Должность</span>
          <span className={s.subtitle}>{appInfo.position}</span>
        </div>
      )}
      <div className={s.field}>
        <span className={s.title}>Опции</span>
        <Options />
      </div>
    </div>
  )
}
