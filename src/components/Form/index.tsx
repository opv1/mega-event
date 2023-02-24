import React from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  column?: boolean
} & React.FormHTMLAttributes<HTMLFormElement>

const Form: React.FC<Props> = (props) => {
  const { column, children, ...formProps } = props

  const classNameForm = classnames(styles.form, {
    [styles.form_column]: column,
  })

  return (
    <form {...formProps} className={classNameForm}>
      {children}
    </form>
  )
}

export default Form
