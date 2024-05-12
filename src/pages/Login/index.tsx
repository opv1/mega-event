import React, { memo, useCallback, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Container } from 'components/Container'
import { Form } from 'components/Form'
import { Button } from 'components/UI/Button'
import { Fieldset } from 'components/UI/Fieldset'
import { FormInputRefType, Input } from 'components/UI/Input'
import { setAppIsAuth } from 'state/app'
import { useAppDispatch } from 'state/hooks'

import { INPUT_TYPE } from 'types'

import styles from './styles.module.scss'

const INPUT_INDEX = {
  [INPUT_TYPE.email]: 0,
  [INPUT_TYPE.password]: 1,
}

type INPUT_NAME_TYPE = INPUT_TYPE.email | INPUT_TYPE.password

export const Login = memo(() => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname

  const inputsRefs = useRef([
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
  ])

  const [values, setValues] = useState({
    [INPUT_TYPE.email]: '',
    [INPUT_TYPE.password]: '',
  })

  const [errors, setErrors] = useState({
    [INPUT_TYPE.email]: '',
    [INPUT_TYPE.password]: '',
  })

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target

      if (errors[name as INPUT_NAME_TYPE] !== '') {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
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
    },
    [dispatch, from, navigate],
  )

  return (
    <Container title='Добро пожаловать'>
      <Form onSubmit={handleSubmit} noValidate>
        <div className={styles.block}>
          <Fieldset error={errors[INPUT_TYPE.email]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.email]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='email'
              inputMode='email'
              name={INPUT_TYPE.email}
              value={values[INPUT_TYPE.email]}
              placeholder='E-mail'
              validationRules='required|email'
            />
          </Fieldset>
          <Fieldset error={errors[INPUT_TYPE.password]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.password]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='password'
              inputMode='text'
              name={INPUT_TYPE.password}
              value={values[INPUT_TYPE.password]}
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
})
