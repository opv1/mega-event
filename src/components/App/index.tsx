import React, { memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../../pages/Login'
import Questionnaire from '../../pages/Questionnaire'
import Success from '../../pages/Success'
import NotFound from '../../pages/NotFound'
import styles from './styles.module.scss'

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.caption}>Coding Mega Event</h1>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/questionnaire' element={<Questionnaire />} />
        <Route path='/success' element={<Success />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default memo(App)
