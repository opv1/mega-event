import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Container } from '@components/Container'
import { Form } from '@components/Form'
import { Button } from '@components/UI/Button'
import { Fieldset } from '@components/UI/Fieldset'
import { FormInputRefType, Input } from '@components/UI/Input'
import { setAppIsAuth } from '@state/app'
import { useAppDispatch } from '@state/hooks'

import { INPUT_TYPE } from '@types'

import s from './styles.module.scss'

const INPUT_INDEX = {
  [INPUT_TYPE.Email]: 0,
  [INPUT_TYPE.Password]: 1,
}

type INPUT_NAME_TYPE = INPUT_TYPE.Email | INPUT_TYPE.Password

export const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname

  const inputsRefs = useRef([
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
  ])

  const [values, setValues] = useState({
    [INPUT_TYPE.Email]: '',
    [INPUT_TYPE.Password]: '',
  })

  const [errors, setErrors] = useState({
    [INPUT_TYPE.Email]: '',
    [INPUT_TYPE.Password]: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target

    if (errors[name as INPUT_NAME_TYPE] !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let isValid = true

    for (let i = 0; i < inputsRefs.current.length; i++) {
      const inputData = inputsRefs.current[i].current?.validate({})

      if (!inputData?.isValid) {
        isValid = false

        setErrors((prev) => ({
          ...prev,
          [inputData?.name ?? 'unknown']: inputData?.error,
        }))
      }
    }

    if (!isValid) {
      return
    }

    dispatch(setAppIsAuth(true))

    if (from) {
      navigate(from, { replace: true })
    } else {
      navigate('/questionnaire')
    }
  }

  return (
    <Container title='Добро пожаловать'>
      <Form onSubmit={handleSubmit} noValidate>
        <div className={s.block}>
          <Fieldset error={errors[INPUT_TYPE.Email]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.Email]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='email'
              inputMode='email'
              name={INPUT_TYPE.Email}
              value={values[INPUT_TYPE.Email]}
              placeholder='E-mail'
              validationRules='required|email'
            />
          </Fieldset>
          <Fieldset error={errors[INPUT_TYPE.Password]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.Password]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='password'
              inputMode='text'
              name={INPUT_TYPE.Password}
              value={values[INPUT_TYPE.Password]}
              placeholder='Пароль'
              validationRules='required|min:8|max:20'
            />
          </Fieldset>
        </div>
        <Button type='submit' disabled={!values.email || !values.password}>
          Войти
        </Button>
      </Form>
    </Container>
  )
}
