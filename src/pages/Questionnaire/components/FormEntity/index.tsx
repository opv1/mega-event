import React, { useState } from 'react'
import Fieldset from '../../../../components/UI/Fieldset'
import Input from '../../../../components/UI/Input'
import Select from '../../../../components/UI/Select'
import { Label } from '../../../../components/UI/Label'
import Checkbox from '../../../../components/UI/Checkbox'
import { dates } from '../../../../consts'
import styles from './styles.module.scss'

const FormEntity: React.FC = () => {
  const [data, setData] = useState({
    name_company: '',
    position: '',
    phone: '',
    event_day: '',
    parking: false,
    handout: false,
    need_help: false,
  })

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handlerChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = event.target
    setData({ ...data, [name]: checked })
  }

  return (
    <>
      <div className={styles.block}>
        <h2 className={styles.title}>Личные данные</h2>
        <Fieldset placeholder='Название компании' value={data.name_company}>
          <Input
            onChange={handlerChange}
            type='text'
            name='name_company'
            value={data.name_company}
          />
        </Fieldset>
        <Fieldset placeholder='Ваша должность' value={data.position}>
          <Input
            onChange={handlerChange}
            type='text'
            name='position'
            value={data.position}
          />
        </Fieldset>
        <Fieldset placeholder='Номер телефона' value={data.phone}>
          <Input
            onChange={handlerChange}
            type='phone'
            name='phone'
            value={data.phone}
          />
        </Fieldset>
      </div>
      <div className={styles.block}>
        <h2 className={styles.title}>Выберите дату мероприятия</h2>
        <Select data={dates} />
        <div className={styles.checkboxes}>
          <Label htmlFor='parking'>
            <Checkbox
              id='parking'
              onChange={handlerChangeCheckbox}
              name='parking'
              checked={data.parking}
            />
            Нужна парковка
          </Label>
          <Label htmlFor='handout'>
            <Checkbox
              id='handout'
              onChange={handlerChangeCheckbox}
              name='handout'
              checked={data.handout}
            />
            Хочу получить раздаточный материал
          </Label>
          <Label htmlFor='need_help'>
            <Checkbox
              id='need_help'
              onChange={handlerChangeCheckbox}
              name='need_help'
              checked={data.need_help}
            />
            Нужна помощь сопровождающего
          </Label>
        </div>
      </div>
    </>
  )
}

export default FormEntity
