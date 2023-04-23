import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { Form, Input } from 'antd'
import React, {useEffect} from 'react'
import {IJobTitle, type JobTitleCreateRequest} from './index'

interface JobTitleFormProps {
  form: FormInstance
  jobTitle?: IJobTitle
  onFinish: (request: JobTitleCreateRequest) => void
}

export interface JobTitleFormResult {
  name: string
  description: string
}

const JobTitleForm = (props: JobTitleFormProps): JSX.Element => {
  useEffect(() => {
    props.form.setFieldsValue({ ...props.jobTitle })
  }, [props.jobTitle])
  return <>
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
        rules={[{ required: true, message: 'Please job title name!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input job title description!' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
  </>
}

export default JobTitleForm
