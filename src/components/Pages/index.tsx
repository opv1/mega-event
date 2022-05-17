import React from 'react'
import Styles from './styles.module.scss'

interface PageProps {
  title: string
  children: React.ReactNode
}

const Page: React.FC<PageProps> = (props) => {
  const { title, children } = props

  return (
    <div className={Styles.page}>
      <h2 className={Styles.title}>{title}</h2>
      <div className={Styles.content}>{children}</div>
    </div>
  )
}

export default Page
