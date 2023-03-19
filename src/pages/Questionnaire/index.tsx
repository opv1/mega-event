import React from 'react'
import Container from 'components/Container'
import Tabs from 'components/UI/Tabs'
import FormIndividual from './components/FormIndividual'
import FormEntity from './components/FormEntity'
import { useAppSelector } from 'state/hooks'

const Questionnaire: React.FC = () => {
  const { isIndividual } = useAppSelector((state) => state.app)

  return (
    <Container title='Заполните анкету участника'>
      <Tabs />
      {isIndividual ? <FormIndividual /> : <FormEntity />}
    </Container>
  )
}

export default Questionnaire
