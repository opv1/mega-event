import cn from 'classnames'
import React from 'react'

import { Button } from '@components/UI/Button'
import { setQuestionnaireType } from '@state/app'
import { selectAppQuestionnaireType } from '@state/app/selectors'
import { useAppDispatch, useAppSelector } from '@state/hooks'

import { MEMBER_VALUES } from '@constants'
import { QUESTIONNAIRE_TYPE } from '@types'

import s from './styles.module.scss'

export const Tabs = () => {
  const dispatch = useAppDispatch()

  const appQuestionnaireType = useAppSelector(selectAppQuestionnaireType)

  const handleSetIndividual = () => {
    if (appQuestionnaireType === QUESTIONNAIRE_TYPE.Entity) {
      dispatch(setQuestionnaireType(QUESTIONNAIRE_TYPE.Individual))
    }
  }

  const handleSetEntity = () => {
    if (appQuestionnaireType === QUESTIONNAIRE_TYPE.Individual) {
      dispatch(setQuestionnaireType(QUESTIONNAIRE_TYPE.Entity))
    }
  }

  return (
    <div className={s.tabs}>
      <Button
        id={QUESTIONNAIRE_TYPE.Individual}
        className={cn(s.button, {
          [s.button_active]:
            appQuestionnaireType === QUESTIONNAIRE_TYPE.Individual,
        })}
        onClick={handleSetIndividual}
      >
        {MEMBER_VALUES[QUESTIONNAIRE_TYPE.Individual]}
      </Button>
      <Button
        id={QUESTIONNAIRE_TYPE.Entity}
        className={cn(s.button, {
          [s.button_active]: appQuestionnaireType === QUESTIONNAIRE_TYPE.Entity,
        })}
        onClick={handleSetEntity}
      >
        {MEMBER_VALUES[QUESTIONNAIRE_TYPE.Entity]}
      </Button>
    </div>
  )
}
