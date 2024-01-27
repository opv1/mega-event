import React, { memo, useMemo } from 'react'

import { useAppSelector } from 'state/hooks'

import { OPTIONS_VALUES } from 'const'
import { OptionsType } from 'types'

import styles from './styles.module.scss'

export const Options = memo(() => {
  const { data } = useAppSelector((state) => state.app)

  const entriesOptions = useMemo(() => Object.entries(data.options), [data])

  return (
    <div id='options' className={styles.options}>
      {entriesOptions.map(([key, value]) => {
        if (value && key === OptionsType.Parking) {
          return (
            <span id={key} key={key} className={styles.option}>
              {OPTIONS_VALUES[OptionsType.Parking]}
            </span>
          )
        }

        if (value && key === OptionsType.Handout) {
          return (
            <span id={key} key={key} className={styles.option}>
              {OPTIONS_VALUES[OptionsType.Handout]}
            </span>
          )
        }

        if (value && key === OptionsType.Help) {
          return (
            <span id={key} key={key} className={styles.option}>
              {OPTIONS_VALUES[OptionsType.Help]}
            </span>
          )
        }

        return null
      })}
    </div>
  )
})
