import React from 'react'
import { Outlet } from 'react-router-dom'

import s from './styles.module.scss'

export const Layout = () => {
  return (
    <main className={s.layout}>
      <h1 className={s.caption}>Coding Mega Event</h1>
      <Outlet />
    </main>
  )
}
