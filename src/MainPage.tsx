import React from 'react'
import LoginForm from './view/login/LoginForm'
import { useCookies } from 'react-cookie'
import MainLayout from './view/layout'

export default function MainPage (): JSX.Element {
  const [cookies] = useCookies(['Authorization'])
  return (
    <div>
      {cookies.Authorization !== undefined && cookies.Authorization !== null ? <MainLayout/> : <LoginForm/>}
    </div>
  )
}
