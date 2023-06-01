import { Form, Input, Select } from 'antd'
import React from 'react'
import { type EmployeeCreateRequest } from './index'
import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { type SimpleAdministrativeUnit } from '../structure/admin'

interface EmployeeFormProps {
  onFinish: (employee: EmployeeCreateRequest) => void
  form: FormInstance
  administrativeUnits: SimpleAdministrativeUnit[]
}

const EmployeeForm = (props: EmployeeFormProps): JSX.Element => {
  return (
    <div>
      <Form
        form={props.form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={props.onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={[{ required: true, message: 'Please input your surname!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Patronymic"
          name="lastname"
          rules={[{ required: true, message: 'Please input your patronymic!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Admin structure"
          name="adminStructures"
          rules={[{ required: true, message: 'Please input your administrative structure!' }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
            options={props.administrativeUnits.map(it => ({ label: it.name, value: it.id }))}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EmployeeForm
