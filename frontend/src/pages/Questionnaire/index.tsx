import React, { memo } from 'react'
import { QUESTIONNAIRE_TYPE } from 'types/index'

import { Container } from 'components/Container'
import { Tabs } from 'components/UI/Tabs'
import { selectAppQuestionnaireType } from 'state/app/selectors'
import { useAppSelector } from 'state/hooks'

import { FormEntity } from './components/FormEntity'
import { FormIndividual } from './components/FormIndividual'

export const Questionnaire = memo(() => {
  const appQuestionnaireType = useAppSelector(selectAppQuestionnaireType)

  return (
    <Container title='Заполните анкету участника'>
      <Tabs />
      {appQuestionnaireType === QUESTIONNAIRE_TYPE.individual ? (
        <FormIndividual />
      ) : (
        <FormEntity />
      )}
    </Container>
  )
})
