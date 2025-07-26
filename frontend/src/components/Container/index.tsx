import React, { memo } from 'react'

import styles from './styles.module.scss'

type ContainerPropsType = {
  children: React.ReactNode
  title: string
}

export const Container = memo((props: ContainerPropsType) => {
  const { children, title } = props

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
})
