import React, { memo, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form } from 'components/Form'
import { Button } from 'components/UI/Button'
import { Checkbox } from 'components/UI/Checkbox'
import { Fieldset } from 'components/UI/Fieldset'
import { FormInputRefType, Input } from 'components/UI/Input'
import { Label, LABEL_DIRECTION } from 'components/UI/Label'
import { Select } from 'components/UI/Select'
import { inputMask } from 'helpers/inputMask'
import { setAppInfo } from 'state/app'
import { useAppDispatch } from 'state/hooks'

import { INPUT_TYPE, OPTIONS_TYPE, QUESTIONNAIRE_TYPE } from 'types'

import styles from './styles.module.scss'

const INPUT_INDEX = {
  [INPUT_TYPE.name]: 0,
  [INPUT_TYPE.birthday]: 1,
  [INPUT_TYPE.phone]: 2,
  [INPUT_TYPE.date]: 3,
}

type INPUT_NAME_TYPE =
  | INPUT_TYPE.name
  | INPUT_TYPE.birthday
  | INPUT_TYPE.phone
  | INPUT_TYPE.date

export const FormIndividual = memo(() => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const inputsRefs = useRef([
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
    useRef<FormInputRefType>(null),
  ])

  const [values, setValues] = useState({
    [INPUT_TYPE.name]: '',
    [INPUT_TYPE.birthday]: '',
    [INPUT_TYPE.phone]: '',
    [INPUT_TYPE.date]: '',
  })

  const [options, setOptions] = useState({
    [OPTIONS_TYPE.parking]: false,
    [OPTIONS_TYPE.handout]: false,
    [OPTIONS_TYPE.help]: false,
  })

  const [errors, setErrors] = useState({
    [INPUT_TYPE.name]: '',
    [INPUT_TYPE.birthday]: '',
    [INPUT_TYPE.phone]: '',
    [INPUT_TYPE.date]: '',
  })

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleChangeBirthday = useCallback((value: string) => {
    setValues((prev) => ({ ...prev, birthday: value }))
  }, [])

  const handleChangePhone = useCallback((value: string) => {
    setValues((prev) => ({ ...prev, phone: value }))
  }, [])

  const handleChangeCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target
      setOptions((prev) => ({ ...prev, [name]: checked }))
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

      if (errors[name as INPUT_NAME_TYPE] !== '') {
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

      dispatch(
        setAppInfo({
          type: QUESTIONNAIRE_TYPE.individual,
          ...values,
          options,
        }),
      )

      navigate('/success')
    },
    [dispatch, navigate, values, options],
  )

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h3 className={styles.title}>Личные данные</h3>
          <Fieldset error={errors[INPUT_TYPE.name]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.name]]}
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              inputMode='text'
              name={INPUT_TYPE.name}
              value={values[INPUT_TYPE.name]}
              maxLength={45}
              placeholder='ФИО'
              validationRules='required|min:2|max:50'
            />
          </Fieldset>
          <Fieldset error={errors[INPUT_TYPE.birthday]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.birthday]]}
              onChangeMask={handleChangeBirthday}
              onFocus={handleFocus}
              type='text'
              inputMode='numeric'
              name={INPUT_TYPE.birthday}
              value={values[INPUT_TYPE.birthday]}
              placeholder='Дата рождения'
              validationRules='required|birthday'
            />
          </Fieldset>
          <Fieldset error={errors[INPUT_TYPE.phone]}>
            <Input
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.phone]]}
              onChangeMask={handleChangePhone}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type='tel'
              inputMode='tel'
              name={INPUT_TYPE.phone}
              value={values[INPUT_TYPE.phone]}
              placeholder='Номер телефона'
              validationRules='required|phone'
            />
          </Fieldset>
        </div>
        <div className={styles.line} />
        <div className={styles.block}>
          <h3 className={styles.title}>Выберите дату мероприятия</h3>
          <Fieldset error={errors[INPUT_TYPE.date]}>
            <Select
              ref={inputsRefs.current[INPUT_INDEX[INPUT_TYPE.date]]}
              onChange={handleChangeSelect}
              onFocus={handleFocusSelect}
              name={INPUT_TYPE.date}
              value={values[INPUT_TYPE.date]}
              placeholder='День мероприятия'
              validationRules='required'
            />
          </Fieldset>
          <div className={styles.checkboxes}>
            <Label
              htmlFor={OPTIONS_TYPE.parking}
              direction={LABEL_DIRECTION.row}
            >
              <Checkbox
                id={OPTIONS_TYPE.parking}
                onChange={handleChangeCheckbox}
                name={OPTIONS_TYPE.parking}
                checked={options[OPTIONS_TYPE.parking]}
              />
              Нужна парковка
            </Label>
            <Label
              htmlFor={OPTIONS_TYPE.handout}
              direction={LABEL_DIRECTION.row}
            >
              <Checkbox
                id={OPTIONS_TYPE.handout}
                onChange={handleChangeCheckbox}
                name={OPTIONS_TYPE.handout}
                checked={options[OPTIONS_TYPE.handout]}
              />
              Хочу получить раздаточный материал
            </Label>
            <Label htmlFor={OPTIONS_TYPE.help} direction={LABEL_DIRECTION.row}>
              <Checkbox
                id={OPTIONS_TYPE.help}
                onChange={handleChangeCheckbox}
                name={OPTIONS_TYPE.help}
                checked={options[OPTIONS_TYPE.help]}
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
