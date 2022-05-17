import React, { useState } from 'react'
import Page from '../../components/Pages'
import Form from '../../components/UI/Form'
import Fieldset from '../../components/UI/Fieldset'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Styles from './styles.module.scss'

const Login: React.FC = () => {
  const [data, setData] = useState({ email: '', password: '' })

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const onLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Page title='Добро пожаловать'>
      <Form>
        <div className={Styles.fieldsets}>
          <Fieldset placeholder='E-mail' value={data.email}>
            <Input onChange={handlerChange} type='email' name='email' value={data.email} />
          </Fieldset>
          <Fieldset placeholder='Пароль' value={data.password}>
            <Input onChange={handlerChange} type='password' name='password' value={data.password} />
          </Fieldset>
        </div>
        <div className={Styles.wrapper}>
          <Button title='Войти' onClick={onLogin} disabled={!data.email || !data.password} />
        </div>
      </Form>
    </Page>
  )
}

export default Login
