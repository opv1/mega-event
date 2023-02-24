import React, { createRef, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../redux/hooks'
import { setData } from '../../../../redux/appSlice'
import Form from '../../../../components/Form'
import Fieldset from '../../../../components/UI/Fieldset'
import Label from '../../../../components/UI/Label'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'
import Select from '../../../../components/UI/Select'
import Checkbox from '../../../../components/UI/Checkbox'
import { IIndividualValues, IErrors } from '../../../../types'
import styles from './styles.module.scss'

const FormIndividual: React.FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const inputsRefs = useRef<any[]>([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ])

  const [values, setValues] = useState<IIndividualValues>({
    type: 'individual',
    name: '',
    birthday: '',
    phone: '',
    date: '',
    options: {
      parking: false,
      handout: false,
      help: false,
    },
  })

  const [errors, setErrors] = useState<IErrors>({
    name: '',
    birthday: '',
    phone: '',
    date: '',
  })

  const handlerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handlerChangeCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target
      setValues((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: checked },
      }))
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

  const handlerChangeValueSelect = useCallback((date: string) => {
    setValues((prev) => ({ ...prev, date: date }))
  }, [])

  const handlerChangeErrorSelect = useCallback(
    (name: string) => {
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

      dispatch(setData(values))

      navigate('/success')
    },
    [values],
  )

  return (
    <Form onSubmit={handlerSubmit} noValidate>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h2 className={styles.title}>Личные данные</h2>
          <Fieldset error={errors.name}>
            <Input
              onChange={handlerChange}
              onFocus={handlerFocus}
              type='text'
              name='name'
              value={values.name}
              placeholder='ФИО'
              validationRules='required|min:2|max:50'
              ref={inputsRefs.current[0]}
            />
          </Fieldset>
          <Fieldset error={errors.birthday}>
            <Input
              onChange={handlerChange}
              onFocus={handlerFocus}
              type='text'
              name='birthday'
              value={values.birthday}
              placeholder='Дата рождения'
              validationRules='required'
              ref={inputsRefs.current[1]}
            />
          </Fieldset>
          <Fieldset error={errors.phone}>
            <Input
              onChange={handlerChange}
              onFocus={handlerFocus}
              type='phone'
              name='phone'
              value={values.phone}
              placeholder='Номер телефона'
              validationRules='required|phone'
              ref={inputsRefs.current[2]}
            />
          </Fieldset>
        </div>
        <div className={styles.block}>
          <h2 className={styles.title}>Выберите дату мероприятия</h2>{' '}
          <Fieldset error={errors.date}>
            <Select
              onClick={handlerChangeValueSelect}
              onFocus={handlerChangeErrorSelect}
              name='date'
              value={values.date}
              validationRules='required'
              ref={inputsRefs.current[3]}
            />
          </Fieldset>
          <div className={styles.checkboxes}>
            <Label htmlFor='parking' direction='row'>
              <Checkbox
                id='parking'
                onChange={handlerChangeCheckbox}
                name='parking'
                checked={values.options.parking}
              />
              Нужна парковка
            </Label>
            <Label htmlFor='handout' direction='row'>
              <Checkbox
                id='handout'
                onChange={handlerChangeCheckbox}
                name='handout'
                checked={values.options.handout}
              />
              Хочу получить раздаточный материал
            </Label>
            <Label htmlFor='help' direction='row'>
              <Checkbox
                id='help'
                onChange={handlerChangeCheckbox}
                name='help'
                checked={values.options.help}
              />
              Нужна помощь сопровождающего
            </Label>
          </div>
        </div>
      </div>
      <Button type='submit'>Отправить заявку</Button>
    </Form>
  )
}

export default FormIndividual
