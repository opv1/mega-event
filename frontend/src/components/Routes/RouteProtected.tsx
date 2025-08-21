import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { selectAppIsAuth } from '@state/app/selectors'
import { useAppSelector } from '@state/hooks'

export const RouteProtected = () => {
  const location = useLocation()

  const appIsAuth = useAppSelector(selectAppIsAuth)

  return appIsAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )
}
