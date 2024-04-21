import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { RouteProtected } from 'components/Routes'
import { Login } from 'pages/Login'
import { NotFound } from 'pages/NotFound'
import { Questionnaire } from 'pages/Questionnaire'
import { Success } from 'pages/Success'

import { fontsForLoad } from 'const'

enum ROUTE_PATH {
  main = '/',
  questionnaire = 'questionnaire',
  success = 'success',
  notFound = '*',
}

export const App = () => {
  const [isFontsReady, setIsFontsReady] = useState(false)

  useEffect(() => {
    for (const font of fontsForLoad) {
      document.fonts.load(font)
    }

    document.fonts.ready
      .then(() => setIsFontsReady(true))
      .catch(() => setIsFontsReady(true))
  }, [])

  return isFontsReady ? (
    <Routes>
      <Route path={ROUTE_PATH.main} element={<Layout />}>
        <Route path={ROUTE_PATH.main} element={<Login />} />
        <Route element={<RouteProtected />}>
          <Route path={ROUTE_PATH.questionnaire} element={<Questionnaire />} />
          <Route path={ROUTE_PATH.success} element={<Success />} />
        </Route>
        <Route path={ROUTE_PATH.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  ) : null
}
