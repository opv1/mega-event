import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from '@components/Layout'
import { RouteProtected } from '@components/Routes'
import { Login } from '@pages/Login'
import { NotFound } from '@pages/NotFound'
import { Questionnaire } from '@pages/Questionnaire'
import { Success } from '@pages/Success'

import { fontsForLoad } from '@constants'

enum ROUTE_PATH {
  Main = '/',
  Questionnaire = 'questionnaire',
  Success = 'success',
  NotFound = '*',
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
      <Route path={ROUTE_PATH.Main} element={<Layout />}>
        <Route path={ROUTE_PATH.Main} element={<Login />} />
        <Route element={<RouteProtected />}>
          <Route path={ROUTE_PATH.Questionnaire} element={<Questionnaire />} />
          <Route path={ROUTE_PATH.Success} element={<Success />} />
        </Route>
        <Route path={ROUTE_PATH.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  ) : null
}
