import React, { useEffect } from 'react'
import LoginForm from './view/login/LoginForm'
import { useCookies } from 'react-cookie'
import MainLayout from './view/layout'
import { Route, Routes, useNavigate } from 'react-router-dom'

export default function MainPage (): JSX.Element {
  const [cookies] = useCookies(['Authorization'])
  const navigate = useNavigate()
  useEffect(() => {
    if (cookies.Authorization === undefined) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/*" element={<MainLayout/>}/>
      </Routes>
    </div>
  )
}
