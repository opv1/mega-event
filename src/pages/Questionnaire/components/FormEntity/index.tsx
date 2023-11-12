import React, { createRef, memo, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'state/hooks'
import { setData } from 'state/appSlice'
import { Form } from 'components/Form'
import { Fieldset } from 'components/UI/Fieldset'
import { Label, LabelDirection } from 'components/UI/Label'
import { Input } from 'components/UI/Input'
import { Button } from 'components/UI/Button'
import { Select } from 'components/UI/Select'
import { Checkbox } from 'components/UI/Checkbox'
import { inputMask } from 'helpers/inputMask'
import { EntityValuesType, ErrorsInterface, FormType } from 'types'

import styles from './styles.module.scss'

export const FormEntity = memo(() => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const inputsRefs = useRef<any[]>([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ])

  const [values, setValues] = useState<EntityValuesType>({
    type: FormType.Entity,
    name: '',
    position: '',
    phone: '',
    date: '',
    options: {
      parking: false,
      handout: false,
      help: false,
    },
  })

  const [errors, setErrors] = useState<ErrorsInterface>({
    name: '',
    position: '',
    phone: '',
    date: '',
  })

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleChangePhone = useCallback((value: string) => {
    setValues((prev) => ({ ...prev, phone: value }))
  }, [])

  const handleChangeCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target
      setValues((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: checked },
      }))
    },
    [],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { type, name, value } = event.target

      if (type === 'tel' && value === '') {
        const valueMask = inputMask(value, '+7 (___) ___-__-__')
        setValues((prev) => ({ ...prev, phone: valueMask }))
      }

      if (errors[name] !== '') {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors],
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { type, value } = event.target

      if (type === 'tel' && value === '+7') {
        setValues((prev) => ({ ...prev, phone: '' }))
      }
    },
    [],
  )

  const handleChangeSelect = useCallback((date: string) => {
    setValues((prev) => ({ ...prev, date: date }))
  }, [])

  const handleFocusSelect = useCallback(
    (name: string) => {
      if (errors[name] !== '') {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
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
    [dispatch, values, navigate],
  )

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h3 className={styles.title}>Личные данные</h3>
          <Fieldset error={errors.name}>
            <Input
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              name='name'
              value={values.name}
              placeholder='Название компании'
              validationRules='required|min:2|max:50'
              ref={inputsRefs.current[0]}
            />
          </Fieldset>
          <Fieldset error={errors.position}>
            <Input
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              name='position'
              value={values.position}
              placeholder='Ваша должность'
              validationRules='required|min:2|max:20'
              ref={inputsRefs.current[1]}
            />
          </Fieldset>
          <Fieldset error={errors.phone}>
            <Input
              onChangeMask={handleChangePhone}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type='tel'
              name='phone'
              value={values.phone}
              placeholder='Номер телефона'
              validationRules='required|phone'
              ref={inputsRefs.current[2]}
            />
          </Fieldset>
        </div>
        <div className={styles.line}></div>
        <div className={styles.block}>
          <h3 className={styles.title}>Выберите дату мероприятия</h3>
          <Fieldset error={errors.date}>
            <Select
              onChange={handleChangeSelect}
              onFocus={handleFocusSelect}
              name='date'
              value={values.date}
              placeholder='День мероприятия'
              validationRules='required'
              ref={inputsRefs.current[3]}
            />
          </Fieldset>
          <div className={styles.checkboxes}>
            <Label htmlFor='parking' direction={LabelDirection.Row}>
              <Checkbox
                id='parking'
                onChange={handleChangeCheckbox}
                name='parking'
                checked={values.options.parking}
              />
              Нужна парковка
            </Label>
            <Label htmlFor='handout' direction={LabelDirection.Row}>
              <Checkbox
                id='handout'
                onChange={handleChangeCheckbox}
                name='handout'
                checked={values.options.handout}
              />
              Хочу получить раздаточный материал
            </Label>
            <Label htmlFor='help' direction={LabelDirection.Row}>
              <Checkbox
                id='help'
                onChange={handleChangeCheckbox}
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
})
