import React, { memo } from 'react'

import { Container } from 'components/Container'
import { Tabs } from 'components/UI/Tabs'
import { useAppSelector } from 'state/hooks'

import { FormEntity } from './components/FormEntity'
import { FormIndividual } from './components/FormIndividual'

export const Questionnaire = memo(() => {
  const { isIndividual } = useAppSelector((state) => state.app)

  return (
    <Container title='Заполните анкету участника'>
      <Tabs />
      {isIndividual ? <FormIndividual /> : <FormEntity />}
    </Container>
  )
})
