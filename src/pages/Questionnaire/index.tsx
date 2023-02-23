import React from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../../components/Pages'
import Form from '../../components/Form'
import { Tabs } from '../../components/UI/Tabs'
import FormIndividual from './components/FormIndividual'
import FormEntity from './components/FormEntity'
import Button from '../../components/UI/Button'
import styles from './styles.module.scss'
import { useAppSelector } from '../../redux/hooks'

const Questionnaire: React.FC = () => {
  const navigate = useNavigate()

  const { isIndividual } = useAppSelector((state) => state.app)

  const onSubmit = () => {
    navigate('/success')
  }

  return (
    <Page title='Заполните анкету участника'>
      <Tabs />
      <Form onSubmit={onSubmit}>
        <div className={styles.container}>
          {isIndividual ? <FormIndividual /> : <FormEntity />}
        </div>
        <div className={styles.wrapper}>
          <Button>Отправить заявку</Button>
        </div>
      </Form>
    </Page>
  )
}

export default Questionnaire
