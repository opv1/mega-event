import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RouteProtected } from 'components/Routes'
import { Layout } from 'components/Layout'
import Login from 'pages/Login'
import Questionnaire from 'pages/Questionnaire'
import Success from 'pages/Success'
import NotFound from 'pages/NotFound'
import { fontsForLoad } from '../../const'

const App: React.FC = () => {
  const [isFontsReady, setIsFontsReady] = useState<boolean>(false)

  useEffect(() => {
    fontsForLoad.forEach((font) => document.fonts.load(font))
    document.fonts.ready
      .then(() => setIsFontsReady(true))
      .catch(() => setIsFontsReady(true))
  }, [])

  return isFontsReady ? (
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
  ) : null
}

export default App
