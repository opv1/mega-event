import React, { memo } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  error: string
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>

const Fieldset: React.FC<Props> = (props) => {
  const { error, children } = props

  const classNameError = classnames(styles.error, {
    [styles.error_active]: error,
  })

  return (
    <fieldset className={styles.fieldset}>
      {children}
      <span className={classNameError}>{error}</span>
    </fieldset>
  )
}

export default memo(Fieldset)
