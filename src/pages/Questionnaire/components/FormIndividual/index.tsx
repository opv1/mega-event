import React, { useState } from 'react'
import Fieldset from '../../../../components/UI/Fieldset'
import Input from '../../../../components/UI/Input'
import Select from '../../../../components/UI/Select'
import { Label } from '../../../../components/UI/Label'
import Checkbox from '../../../../components/UI/Checkbox'
import { dates } from '../../../../consts'
import styles from './styles.module.scss'

const FormIndividual: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    birthday: '',
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
        <Fieldset placeholder='ФИО' value={data.name}>
          <Input
            onChange={handlerChange}
            type='text'
            name='name'
            value={data.name}
          />
        </Fieldset>
        <Fieldset placeholder='Дата рождения' value={data.birthday}>
          <Input
            onChange={handlerChange}
            type='text'
            name='birthday'
            value={data.birthday}
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

export default FormIndividual
