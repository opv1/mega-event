import React from 'react'
import styles from './styles.module.scss'

interface PageProps {
  title: string
  children: React.ReactNode
}

const Page: React.FC<PageProps> = (props) => {
  const { title, children } = props

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Page
