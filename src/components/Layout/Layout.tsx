import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'

const Layout: React.FC = () => {
  return (
    <main className={styles.layout}>
      <h1 className={styles.caption}>Coding Mega Event</h1>
      <Outlet />
    </main>
  )
}

export default Layout
