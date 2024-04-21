import React, { memo, useMemo } from 'react'

import { selectAppInfo } from 'state/app/selectors'
import { useAppSelector } from 'state/hooks'

import { OPTIONS_VALUES } from 'const'
import { OPTIONS_TYPE } from 'types'

import styles from './styles.module.scss'

export const Options = memo(() => {
  const { options } = useAppSelector(selectAppInfo)

  const entriesOptions = useMemo(() => Object.entries(options), [options])

  return (
    <div id='options' className={styles.options}>
      {entriesOptions.map(([key, value]) => {
        if (value && key === OPTIONS_TYPE.parking) {
          return (
            <span id={key} key={key} className={styles.option}>
              {OPTIONS_VALUES[OPTIONS_TYPE.parking]}
            </span>
          )
        }

        if (value && key === OPTIONS_TYPE.handout) {
          return (
            <span id={key} key={key} className={styles.option}>
              {OPTIONS_VALUES[OPTIONS_TYPE.handout]}
            </span>
          )
        }

        if (value && key === OPTIONS_TYPE.help) {
          return (
            <span id={key} key={key} className={styles.option}>
              {OPTIONS_VALUES[OPTIONS_TYPE.help]}
            </span>
          )
        }

        return null
      })}
    </div>
  )
})
