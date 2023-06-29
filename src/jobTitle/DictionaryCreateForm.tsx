import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { Form, Input } from 'antd'
import React, {useEffect} from 'react'
import {Dictionary, DictionaryCreateRequest, DictionaryUpdateRequest} from './index'

interface DictionaryFormProps<T extends Dictionary, C extends DictionaryCreateRequest, U extends DictionaryUpdateRequest> {
  form: FormInstance
  onFinish: (request: C) => void
}


function DictionaryCreateForm<T extends Dictionary, C extends DictionaryCreateRequest, U extends DictionaryUpdateRequest>(props: DictionaryFormProps<T, C, U>) {
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

}

export default DictionaryCreateForm
