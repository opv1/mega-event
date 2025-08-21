import React from 'react'

import s from './styles.module.scss'

type ContainerPropsType = {
  children: React.ReactNode
  title: string
}

export const Container = (props: ContainerPropsType) => {
  const { children, title } = props

  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.content}>{children}</div>
    </div>
  )
}
