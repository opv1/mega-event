import React, { memo, useMemo } from 'react'

import { useAppSelector } from 'state/hooks'

import styles from './styles.module.scss'

enum OptionsType {
  Parking = 'parking',
  Handout = 'handout',
  Help = 'help',
}

export const Options = memo(() => {
  const { data } = useAppSelector((state) => state.app)

  const entriesOptions = useMemo(() => Object.entries(data.options), [data])

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
})
