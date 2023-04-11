import { type Middleware, type MiddlewareAPI } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const navigate = (path: string): void => {
      window.location.href = path
    }
    const cleanAuthentication = (): void => {
      document.cookie = 'Authorization=; Max-Age=0; path=/; domain=' + location.hostname
    }
    if (action?.payload?.status === 403) {
      navigate('/login')
      cleanAuthentication()
    }
    return next(action)
  }
