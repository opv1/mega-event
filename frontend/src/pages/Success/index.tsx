import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Container } from '@components/Container'
import { Button } from '@components/UI/Button'

import { Complete } from './components/Complete'

export const Success = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Container title='Спасибо за заявку!'>
      <Complete />
      <Button onClick={handleClick}>Вернуться на главную</Button>
    </Container>
  )
}
