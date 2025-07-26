import classnames from 'classnames'
import React, { memo, useCallback } from 'react'

import { Button } from 'components/UI/Button'
import { setQuestionnaireType } from 'state/app'
import { selectAppQuestionnaireType } from 'state/app/selectors'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { MEMBER_VALUES } from 'const'
import { QUESTIONNAIRE_TYPE } from 'types'

import styles from './styles.module.scss'

export const Tabs = memo(() => {
  const dispatch = useAppDispatch()

  const appQuestionnaireType = useAppSelector(selectAppQuestionnaireType)

  const classNameIndividual = classnames(styles.button, {
    [styles.button_active]:
      appQuestionnaireType === QUESTIONNAIRE_TYPE.individual,
  })

  const classNameEntity = classnames(styles.button, {
    [styles.button_active]: appQuestionnaireType === QUESTIONNAIRE_TYPE.entity,
  })

  const handleSetIndividual = useCallback(() => {
    if (appQuestionnaireType === QUESTIONNAIRE_TYPE.entity) {
      dispatch(setQuestionnaireType(QUESTIONNAIRE_TYPE.individual))
    }
  }, [dispatch, appQuestionnaireType])

  const handleSetEntity = useCallback(() => {
    if (appQuestionnaireType === QUESTIONNAIRE_TYPE.individual) {
      dispatch(setQuestionnaireType(QUESTIONNAIRE_TYPE.entity))
    }
  }, [dispatch, appQuestionnaireType])

  return (
    <div className={styles.tabs}>
      <Button
        id={QUESTIONNAIRE_TYPE.individual}
        className={classNameIndividual}
        onClick={handleSetIndividual}
      >
        {MEMBER_VALUES[QUESTIONNAIRE_TYPE.individual]}
      </Button>
      <Button
        id={QUESTIONNAIRE_TYPE.entity}
        className={classNameEntity}
        onClick={handleSetEntity}
      >
        {MEMBER_VALUES[QUESTIONNAIRE_TYPE.entity]}
      </Button>
    </div>
  )
})
