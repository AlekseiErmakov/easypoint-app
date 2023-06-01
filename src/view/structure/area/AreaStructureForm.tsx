import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { type AreaStructureType } from './types'
import { type AreaStructureCreateRequest, type Area } from './index'
import { Form, Input, Select } from 'antd'
import React from 'react'

interface AreaStructureTypeProps {
  form: FormInstance
  areas: Area[]
  areaStructureTypes: AreaStructureType[]
  onFinish: (areaStructure: AreaStructureCreateRequest) => void
}

export const AreaStructureForm = (props: AreaStructureTypeProps): JSX.Element => {
  return <Form
      form={props.form}
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      onFinish={props.onFinish}
      autoComplete="off"
    >
      <Form.Item name="areaStructureTypeId" label="Area structure type" rules={[{ required: true }]}
                 initialValue={undefined}>
        <Select options={props.areaStructureTypes.map(it => ({ label: it.name, value: it.id }))}/>
      </Form.Item>
      <Form.Item name="parentId" label="Area structure parent"
                 initialValue={undefined}>
        <Select options={props.areas.map(it => ({ label: it.name, value: it.id }))}/>
      </Form.Item>
      <Form.Item label="Name" name="name"
                 rules={[{ required: true, message: 'Please input area structure type name!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Description" name="description"
                 rules={[{ required: true, message: 'Please input area structure type description!' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
}
