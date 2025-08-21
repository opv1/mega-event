import React from 'react'

import { Container } from '@components/Container'
import { Tabs } from '@components/UI/Tabs'
import { selectAppQuestionnaireType } from '@state/app/selectors'
import { useAppSelector } from '@state/hooks'

import { QUESTIONNAIRE_TYPE } from '@types'

import { FormEntity } from './components/FormEntity'
import { FormIndividual } from './components/FormIndividual'

export const Questionnaire = () => {
  const appQuestionnaireType = useAppSelector(selectAppQuestionnaireType)

  return (
    <Container title='Заполните анкету участника'>
      <Tabs />
      {appQuestionnaireType === QUESTIONNAIRE_TYPE.Individual ? (
        <FormIndividual />
      ) : (
        <FormEntity />
      )}
    </Container>
  )
}
