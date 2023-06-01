import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { type Competency } from './index'

interface CompetencyFormProps {
  form: FormInstance
  competency?: Competency

  onFinish: (request: CompetencyFormResult) => void
}

export interface CompetencyFormResult {
  name: string
  description: string
}

const CompetencyForm = (props: CompetencyFormProps): JSX.Element => {
  useEffect(() => {
    props.form.setFieldsValue({ ...props.competency })
  }, [props.competency])
  return <div>
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
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please competency name!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input competency description!' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
  </div>
}

export default CompetencyForm
