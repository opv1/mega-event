import classnames from 'classnames'
import React, { memo, useCallback } from 'react'

import { Button } from 'components/UI/Button'
import { setIsIndividual } from 'state/appSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { MEMBER_VALUES } from 'const'
import { QuestionnaireType } from 'types'

import styles from './styles.module.scss'

export const Tabs = memo(() => {
  const dispatch = useAppDispatch()

  const { isIndividual } = useAppSelector((state) => state.app)

  const classNameIndividual = classnames(styles.button, {
    [styles.button_active]: isIndividual,
  })

  const classNameEntity = classnames(styles.button, {
    [styles.button_active]: !isIndividual,
  })

  const handleSetIndividual = useCallback(() => {
    if (!isIndividual) {
      dispatch(setIsIndividual(true))
    }
  }, [dispatch, isIndividual])

  const handleSetEntity = useCallback(() => {
    if (isIndividual) {
      dispatch(setIsIndividual(false))
    }
  }, [dispatch, isIndividual])

  return (
    <div className={styles.tabs}>
      <Button
        id={QuestionnaireType.Individual}
        className={classNameIndividual}
        onClick={handleSetIndividual}
      >
        {MEMBER_VALUES[QuestionnaireType.Individual]}
      </Button>
      <Button
        id={QuestionnaireType.Entity}
        className={classNameEntity}
        onClick={handleSetEntity}
      >
        {MEMBER_VALUES[QuestionnaireType.Entity]}
      </Button>
    </div>
  )
})
