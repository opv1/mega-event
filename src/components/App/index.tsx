import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../../pages/Login'
import Questionnaire from '../../pages/Questionnaire'
import Success from '../../pages/Success'
import Styles from './styles.module.scss'

const App: React.FC = () => {
  return (
    <div className={Styles.app}>
      <h1 className={Styles.caption}>Coding Mega Event</h1>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<Questionnaire />} />
        {/* <Route path='/' element={<Success />} /> */}
      </Routes>
    </div>
  )
}

export default App
