import React from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../../components/Pages'
import { Complete } from './components/Complete'
import Button from '../../components/UI/Button'

const Success: React.FC = () => {
  const navigate = useNavigate()

  const onBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <Page title='Спасибо за заявку!'>
      <Complete />
      <Button onClick={onBack}>Вернуться на главную</Button>
    </Page>
  )
}

export default Success
