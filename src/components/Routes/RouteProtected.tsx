import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

const RouteProtected: React.FC = () => {
  const location = useLocation()

  const { isAuth } = useAppSelector((state) => state.app)

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )
}

export default RouteProtected
