import React, { memo } from 'react'
import styles from './styles.module.scss'

type Props = {
  title: string
  children: React.ReactNode
}

const Container: React.FC<Props> = (props) => {
  const { title, children } = props

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default memo(Container)
