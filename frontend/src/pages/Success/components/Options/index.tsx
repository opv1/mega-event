import React, { useMemo } from 'react'

import { selectAppInfo } from '@state/app/selectors'
import { useAppSelector } from '@state/hooks'

import { OPTIONS_VALUES } from '@constants'
import { OPTIONS_TYPE } from '@types'

import s from './styles.module.scss'

export const Options = () => {
  const { options } = useAppSelector(selectAppInfo)

  const entriesOptions = useMemo(() => Object.entries(options), [options])

  return (
    <div id='options' className={s.options}>
      {entriesOptions.map(([key, value]) => {
        if (value && key === OPTIONS_TYPE.Parking) {
          return (
            <span id={key} key={key} className={s.option}>
              {OPTIONS_VALUES[OPTIONS_TYPE.Parking]}
            </span>
          )
        }

        if (value && key === OPTIONS_TYPE.Handout) {
          return (
            <span id={key} key={key} className={s.option}>
              {OPTIONS_VALUES[OPTIONS_TYPE.Handout]}
            </span>
          )
        }

        if (value && key === OPTIONS_TYPE.Help) {
          return (
            <span id={key} key={key} className={s.option}>
              {OPTIONS_VALUES[OPTIONS_TYPE.Help]}
            </span>
          )
        }

        return null
      })}
    </div>
  )
}
