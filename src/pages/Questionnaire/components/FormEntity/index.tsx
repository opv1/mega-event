import React, { useState } from 'react'
import Fieldset from '../../../../components/UI/Fieldset'
import Input from '../../../../components/UI/Input'
import Select from '../../../../components/UI/Select'
import Checkbox from '../../../../components/UI/Checkbox'
import { dates } from '../../../../consts'
import Styles from './styles.module.scss'

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
      <div className={Styles.block}>
        <h2 className={Styles.title}>Личные данные</h2>
        <div className={Styles.fieldsets}>
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
      </div>
      <div className={Styles.block}>
        <h2 className={Styles.title}>Выберите дату мероприятия</h2>
        <div className={Styles.fieldsets}>
          <Select data={dates} />
          <div className={Styles.checkboxes}>
            <Checkbox
              label='Нужна парковка'
              onChange={handlerChangeCheckbox}
              name='parking'
              checked={data.parking}
            />
            <Checkbox
              label='Хочу получить раздаточный материал'
              onChange={handlerChangeCheckbox}
              name='handout'
              checked={data.handout}
            />
            <Checkbox
              label='Нужна помощь сопровождающего'
              onChange={handlerChangeCheckbox}
              name='need_help'
              checked={data.need_help}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormEntity
