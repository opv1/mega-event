import React, { createRef, useCallback, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setIsAuth } from '../../redux/appSlice'
import Container from '../../components/Container'
import Form from '../../components/Form'
import Fieldset from '../../components/UI/Fieldset'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { ILogin, IErrors } from '../../types'
import styles from './styles.module.scss'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname

  const inputsRefs = useRef<any[]>([createRef(), createRef()])

  const [values, setValues] = useState<ILogin>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<IErrors>({
    email: '',
    password: '',
  })

  const handlerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handlerFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target

      if (errors[name] !== '') {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors],
  )

  const handlerSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      let isValidForm = true

      for (let i = 0; i < inputsRefs.current.length; i++) {
        const { isValid, name, error } =
          inputsRefs.current[i].current.validate()

        if (!isValid) {
          setErrors((prev) => ({ ...prev, [name]: error }))
          isValidForm = false
        }
      }

      if (!isValidForm) {
        return
      }

      dispatch(setIsAuth(true))

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
      <Form onSubmit={handlerSubmit} noValidate>
        <div className={styles.block}>
          <Fieldset error={errors.email}>
            <Input
              onChange={handlerChange}
              onFocus={handlerFocus}
              type='email'
              name='email'
              value={values.email}
              placeholder='E-mail'
              validationRules='required|email'
              ref={inputsRefs.current[0]}
            />
          </Fieldset>
          <Fieldset error={errors.password}>
            <Input
              onChange={handlerChange}
              onFocus={handlerFocus}
              type='password'
              name='password'
              value={values.password}
              placeholder='Пароль'
              validationRules='required|min:8|max:20'
              ref={inputsRefs.current[1]}
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

export default Login
