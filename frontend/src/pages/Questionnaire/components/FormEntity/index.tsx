import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form } from '@components/Form'
import { Button } from '@components/UI/Button'
import { Checkbox } from '@components/UI/Checkbox'
import { Fieldset } from '@components/UI/Fieldset'
import { FormInputRefType, Input } from '@components/UI/Input'
import { Label, LABEL_DIRECTION } from '@components/UI/Label'
import { Select } from '@components/UI/Select'
import { inputMask } from '@helpers/inputMask'
import { setAppInfo } from '@state/app'
import { useAppDispatch } from '@state/hooks'

import { INPUT_TYPE, OPTIONS_TYPE, QUESTIONNAIRE_TYPE } from '@types'

import s from './styles.module.scss'

const INPUT_INDEX = {
  [INPUT_TYPE.Name]: 0,
  [INPUT_TYPE.Position]: 1,
  [INPUT_TYPE.Phone]: 2,
  [INPUT_TYPE.Date]: 3,
}

type INPUT_NAME_TYPE =
  | INPUT_TYPE.Name
  | INPUT_TYPE.Position
  | INPUT_TYPE.Phone
  | INPUT_TYPE.Date

export const FormEntity = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const inputsRefs = useRef([
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
  ])

  const [values, setValues] = useState({
    [INPUT_TYPE.Name]: '',
    [INPUT_TYPE.Position]: '',
    [INPUT_TYPE.Phone]: '',
    [INPUT_TYPE.Date]: '',
  })

  const [options, setOptions] = useState({
    [OPTIONS_TYPE.Parking]: false,
    [OPTIONS_TYPE.Handout]: false,
    [OPTIONS_TYPE.Help]: false,
  })

  const [errors, setErrors] = useState({
    [INPUT_TYPE.Name]: '',
    [INPUT_TYPE.Position]: '',
    [INPUT_TYPE.Phone]: '',
    [INPUT_TYPE.Date]: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePhone = (value: string) => {
    setValues((prev) => ({ ...prev, phone: value }))
  }

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setOptions((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { type, name, value } = event.target

    if (type === 'tel' && value === '') {
      const valueMask = inputMask(value, '+7 (___) ___-__-__')
      setValues((prev) => ({ ...prev, phone: valueMask }))
    }

    if (errors[name as INPUT_NAME_TYPE] !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { type, value } = event.target

    if (type === 'tel' && value === '+7') {
      setValues((prev) => ({ ...prev, phone: '' }))
    }
  }

  const handleChangeSelect = (date: string) => {
    setValues((prev) => ({ ...prev, date: date }))
  }

  const handleFocusSelect = (name: string) => {
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

    dispatch(
      setAppInfo({ type: QUESTIONNAIRE_TYPE.Entity, ...values, options }),
    )

    navigate('/success')
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div className={s.blocks}>
        <div className={s.block}>
          <h3 className={s.title}>Личные данные</h3>
          <Fieldset error={errors[INPUT_TYPE.Name]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.Name]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              inputMode='text'
              name={INPUT_TYPE.Name}
              value={values[INPUT_TYPE.Name]}
              maxLength={45}
              placeholder='Название компании'
              validationRules='required|min:2|max:50'
            />
          </Fieldset>
          <Fieldset error={errors[INPUT_TYPE.Position]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.Position]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              inputMode='text'
              name={INPUT_TYPE.Position}
              value={values[INPUT_TYPE.Position]}
              placeholder='Ваша должность'
              validationRules='required|min:2|max:20'
            />
          </Fieldset>
          <Fieldset error={errors[INPUT_TYPE.Phone]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.Phone]]}
              onChangeMask={handleChangePhone}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type='tel'
              inputMode='tel'
              name={INPUT_TYPE.Phone}
              value={values[INPUT_TYPE.Phone]}
              placeholder='Номер телефона'
              validationRules='required|phone'
            />
          </Fieldset>
        </div>
        <div className={s.line} />
        <div className={s.block}>
          <h3 className={s.title}>Выберите дату мероприятия</h3>
          <Fieldset error={errors[INPUT_TYPE.Date]}>
            <Select
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.Date]]}
              onChange={handleChangeSelect}
              onFocus={handleFocusSelect}
              name={INPUT_TYPE.Date}
              value={values[INPUT_TYPE.Date]}
              placeholder='День мероприятия'
              validationRules='required'
            />
          </Fieldset>
          <div className={s.checkboxes}>
            <Label
              htmlFor={OPTIONS_TYPE.Parking}
              direction={LABEL_DIRECTION.Row}
            >
              <Checkbox
                id={OPTIONS_TYPE.Parking}
                onChange={handleChangeCheckbox}
                name={OPTIONS_TYPE.Parking}
                checked={options[OPTIONS_TYPE.Parking]}
              />
              Нужна парковка
            </Label>
            <Label
              htmlFor={OPTIONS_TYPE.Handout}
              direction={LABEL_DIRECTION.Row}
            >
              <Checkbox
                id={OPTIONS_TYPE.Handout}
                onChange={handleChangeCheckbox}
                name={OPTIONS_TYPE.Handout}
                checked={options[OPTIONS_TYPE.Handout]}
              />
              Хочу получить раздаточный материал
            </Label>
            <Label htmlFor={OPTIONS_TYPE.Help} direction={LABEL_DIRECTION.Row}>
              <Checkbox
                id={OPTIONS_TYPE.Help}
                onChange={handleChangeCheckbox}
                name={OPTIONS_TYPE.Help}
                checked={options[OPTIONS_TYPE.Help]}
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
