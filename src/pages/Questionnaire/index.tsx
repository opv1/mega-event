import React, { useState } from 'react'
import Page from '../../components/Pages'
import Form from '../../components/UI/Form'
import FormIndividual from './components/FormIndividual'
import FormEntity from './components/FormEntity'
import Button from '../../components/UI/Button'
import Styles from './styles.module.scss'

const Questionnaire: React.FC = () => {
  const [individualFrom, setIndividualFrom] = useState(true)

  const toggleForm = () => setIndividualFrom((prev) => !prev)

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Page title='Заполните анкету участника'>
      <div className={Styles.tabs}>
        <button
          className={individualFrom ? `${Styles.tab} ${Styles.tab_active}` : `${Styles.tab}`}
          onClick={toggleForm}
        >
          Физ. лицо
        </button>
        <button
          className={!individualFrom ? `${Styles.tab} ${Styles.tab_active}` : `${Styles.tab}`}
          onClick={toggleForm}
        >
          Юр. лицо
        </button>
      </div>
      <Form>
        <div className={Styles.container}>{individualFrom ? <FormIndividual /> : <FormEntity />}</div>
        <div className={Styles.wrapper}>
          <Button title='Отправить заявку' onClick={onSubmit} />
        </div>
      </Form>
    </Page>
  )
}

export default Questionnaire
