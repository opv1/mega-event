import React, { memo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from 'state/hooks'

export const RouteProtected = memo(() => {
  const location = useLocation()

  const { isAuth } = useAppSelector((state) => state.app)

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )
})
