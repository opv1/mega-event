import React, { memo, useCallback } from 'react'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setIsIndividual } from 'state/appSlice'
import { Button } from 'components/UI/Button'
import styles from './styles.module.scss'

const Tabs: React.FC = () => {
  const dispatch = useAppDispatch()

  const { isIndividual } = useAppSelector((state) => state.app)

  const classNameIndividual = classnames(styles.button, {
    [styles.button_active]: isIndividual,
  })

  const classNameEntity = classnames(styles.button, {
    [styles.button_active]: !isIndividual,
  })

  const handleSetIndividual = useCallback(() => {
    if (!isIndividual) {
      dispatch(setIsIndividual(true))
    }
  }, [isIndividual, dispatch])

  const handleSetEntity = useCallback(() => {
    if (isIndividual) {
      dispatch(setIsIndividual(false))
    }
  }, [isIndividual, dispatch])

  return (
    <div className={styles.tabs}>
      <Button className={classNameIndividual} onClick={handleSetIndividual}>
        Физ. лицо
      </Button>
      <Button className={classNameEntity} onClick={handleSetEntity}>
        Юр. лицо
      </Button>
    </div>
  )
}

export default memo(Tabs)
