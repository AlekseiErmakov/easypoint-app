import { Form, Input } from 'antd'
import React from 'react'
import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { type TotalStationCreateRequest } from './index'

interface TotalStationFormProps {
  form: FormInstance

  onFinish: (totalStation: TotalStationCreateRequest) => void
}

const TotalStationForm = (props: TotalStationFormProps) => {
  return <Form
      form={props.form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={props.onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Firm"
        name="firm"
        rules={[{ required: true, message: 'Please input total station firm!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: 'Please input total station model!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Serial number"
        name="serialNumber"
        rules={[{ required: true, message: 'Please input total station serial number!' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
}

export default TotalStationForm
