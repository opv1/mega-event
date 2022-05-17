import React from 'react'
import Page from '../../components/Pages'
import Button from '../../components/UI/Button'
import Styles from './styles.module.scss'

const Success: React.FC = () => {
  const onBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Page title='Спасибо за заявку!'>
      <div className={Styles.complete}>
        <div className={Styles.field}>
          <span className={Styles.title}>ФИО</span>
          <span className={Styles.subtitle}>Иванов Иван Иванович</span>
        </div>
        <div className={Styles.field}>
          <span className={Styles.title}>ФИО</span>
          <span className={Styles.subtitle}>Иванов Иван Иванович</span>
        </div>
        <div className={Styles.field}>
          <span className={Styles.title}>ФИО</span>
          <span className={Styles.subtitle}>Иванов Иван Иванович</span>
        </div>
      </div>
      <div className={Styles.wrapper}>
        <Button title='Вернуться на главную' onClick={onBack} />
      </div>
    </Page>
  )
}

export default Success
