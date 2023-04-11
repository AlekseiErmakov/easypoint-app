import React, { type CSSProperties, useEffect } from 'react'
import { Button, Card, Checkbox, Form, Input } from 'antd'
import axios from 'axios'
import { type IUser, useActions } from './reducer'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

interface LoginPassword {
  username: string
  password: string
}

interface IResponse {
  data: IUser
}

const containerStyles: CSSProperties = {
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  justifyContent: 'center'
}

const LoginForm: React.FC = () => {
  const { authenticate } = useActions()
  const [cookies, setCookie] = useCookies(['Authorization'])
  const navigate = useNavigate()
  const onFinish = (request: LoginPassword): void => {
    void axios.post<LoginPassword, IResponse>('/auth/authenticate', request)
      .then(resp => {
        authenticate(resp.data)
        setCookie('Authorization', 'Bearer ' + resp.data.token)
        navigate('/')
      })
  }
  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    if (cookies.Authorization !== undefined) {
      navigate('/')
    }
  }, [])

  return (<div style={containerStyles}>
      <Card style={{ width: 600 }}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 20 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
