import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/Container'
import Complete from './components/Complete'
import Button from '../../components/UI/Button'

const Success: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <Container title='Спасибо за заявку!'>
      <Complete />
      <Button onClick={handleClick}>Вернуться на главную</Button>
    </Container>
  )
}

export default Success
