import React, { memo } from 'react'

import { Container } from 'components/Container'
import { Tabs } from 'components/UI/Tabs'
import { useAppSelector } from 'state/hooks'

import { FormIndividual } from './components/FormIndividual'
import { FormEntity } from './components/FormEntity'

export const Questionnaire = memo(() => {
  const { isIndividual } = useAppSelector((state) => state.app)

  return (
    <Container title='Заполните анкету участника'>
      <Tabs />
      {isIndividual ? <FormIndividual /> : <FormEntity />}
    </Container>
  )
})
