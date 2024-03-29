import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { RouteProtected } from 'components/Routes'
import { Login } from 'pages/Login'
import { NotFound } from 'pages/NotFound'
import { Questionnaire } from 'pages/Questionnaire'
import { Success } from 'pages/Success'

import { fontsForLoad } from '../../const'

enum RoutePath {
  Main = '/',
  Questionnaire = 'questionnaire',
  Success = 'success',
  NotFound = '*',
}

export const App = () => {
  const [isFontsReady, setIsFontsReady] = useState<boolean>(false)

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
      <Route path={RoutePath.Main} element={<Layout />}>
        <Route path={RoutePath.Main} element={<Login />} />
        <Route element={<RouteProtected />}>
          <Route path={RoutePath.Questionnaire} element={<Questionnaire />} />
          <Route path={RoutePath.Success} element={<Success />} />
        </Route>
        <Route path={RoutePath.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  ) : null
}
