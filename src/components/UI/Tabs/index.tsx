import React from 'react'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { setIsIndividual } from '../../../redux/appSlice'
import styles from './styles.module.scss'

export const Tabs: React.FC = () => {
  const dispatch = useAppDispatch()

  const { isIndividual } = useAppSelector((state) => state.app)

  const classNameIndividual = classnames(styles.tab, {
    [styles.tab_active]: isIndividual,
  })

  const classNameEntity = classnames(styles.tab, {
    [styles.tab_active]: !isIndividual,
  })

  const handlerSetIndividual = () => {
    dispatch(setIsIndividual(true))
  }

  const handlerSetEntity = () => {
    dispatch(setIsIndividual(false))
  }

  return (
    <div className={styles.tabs}>
      <button className={classNameIndividual} onClick={handlerSetIndividual}>
        Физ. лицо
      </button>
      <button className={classNameEntity} onClick={handlerSetEntity}>
        Юр. лицо
      </button>
    </div>
  )
}
