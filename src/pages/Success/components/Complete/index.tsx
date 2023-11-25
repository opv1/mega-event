import React, { memo, useCallback, useMemo } from 'react'
import { FormType } from 'types/index'

import { useAppSelector } from 'state/hooks'

import styles from './styles.module.scss'

enum OptionsType {
  Parking = 'parking',
  Handout = 'handout',
  Help = 'help',
}

export const Complete = memo(() => {
  const { data } = useAppSelector((state) => state.app)

  const entriesOptions = useMemo(() => Object.entries(data.options), [data])

  const renderOptions = useCallback(() => {
    return (
      <>
        {entriesOptions.map(([key, value]) => {
          if (value && key === OptionsType.Parking) {
            return (
              <span key={key} className={styles.subtitle}>
                Нужна парковка
              </span>
            )
          } else if (value && key === OptionsType.Handout) {
            return (
              <span key={key} className={styles.subtitle}>
                Хочу получить раздаточный материал
              </span>
            )
          } else if (value && key === OptionsType.Help) {
            return (
              <span key={key} className={styles.subtitle}>
                Нужна помощь сопровождающего
              </span>
            )
          } else {
            return null
          }
        })}
      </>
    )
  }, [entriesOptions])

  return (
    <div className={styles.complete}>
      <div className={styles.field}>
        <span className={styles.title}>ФИО</span>
        <span className={styles.subtitle}>{data.name}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.title}>Тип участника</span>
        <span className={styles.subtitle}>
          {data.type === FormType.Individual ? 'Физ. лицо' : 'Юр. лицо'}
        </span>
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
        {renderOptions()}
      </div>
    </div>
  )
})
