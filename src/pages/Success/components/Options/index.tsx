import React, { memo, useMemo } from 'react'

import { useAppSelector } from 'state/hooks'

import styles from './styles.module.scss'

export enum OptionsType {
  Parking = 'parking',
  Handout = 'handout',
  Help = 'help',
}

export const OPTIONS_VALUES = {
  [OptionsType.Parking]: 'Нужна парковка',
  [OptionsType.Handout]: 'Хочу получить раздаточный материал',
  [OptionsType.Help]: 'Нужна помощь сопровождающего',
}

export const Options = memo(() => {
  const { data } = useAppSelector((state) => state.app)

  const entriesOptions = useMemo(() => Object.entries(data.options), [data])

  return (
    <div className={styles.options} data-test='options'>
      {entriesOptions.map(([key, value]) => {
        if (value && key === OptionsType.Parking) {
          return (
            <span key={key} className={styles.option} data-test={key}>
              {OPTIONS_VALUES[OptionsType.Parking]}
            </span>
          )
        } else if (value && key === OptionsType.Handout) {
          return (
            <span key={key} className={styles.option} data-test={key}>
              {OPTIONS_VALUES[OptionsType.Handout]}
            </span>
          )
        } else if (value && key === OptionsType.Help) {
          return (
            <span key={key} className={styles.option} data-test={key}>
              {OPTIONS_VALUES[OptionsType.Help]}
            </span>
          )
        } else {
          return null
        }
      })}
    </div>
  )
})
