import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RouteProtected from '../Routes/RouteProtected'
import Layout from '../Layout'
import Login from '../../pages/Login'
import Questionnaire from '../../pages/Questionnaire'
import Success from '../../pages/Success'
import NotFound from '../../pages/NotFound'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Login />} />
        <Route element={<RouteProtected />}>
          <Route path='questionnaire' element={<Questionnaire />} />
          <Route path='success' element={<Success />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
