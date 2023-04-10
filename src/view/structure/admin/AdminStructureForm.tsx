import { type FormInstance } from 'antd/es/form/hooks/useForm'
import { Form, Input, Select } from 'antd'
import React from 'react'
import { type IAdministrativeUnitType } from './types'
import {type AdministrativeUnitCreateRequest, type IAdministrativeUnit, ISimpleAdministrativeUnit} from './index'

interface AdminStructureTypeProps {
  form: FormInstance

  administrativeUnits: ISimpleAdministrativeUnit[]
  administrativeUnitTypes: IAdministrativeUnitType[]

  onFinish: (adminStructure: AdministrativeUnitCreateRequest) => void
}

export const AdminStructureForm = (props: AdminStructureTypeProps): JSX.Element => {
  return <>
    <Form
      form={props.form}
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      onFinish={props.onFinish}
      autoComplete="off"
    >
      <Form.Item name="adminStructureTypeId" label="Admin structure type" rules={[{ required: true }]}
                 initialValue={undefined}>
        <Select options={props.administrativeUnitTypes.map(it => ({ label: it.name, value: it.id }))}/>
      </Form.Item>
      <Form.Item name="parentId" label="Admin structure parent"
                 initialValue={undefined}>
        <Select options={props.administrativeUnits.map(it => ({ label: it.name, value: it.id }))}/>
      </Form.Item>
      <Form.Item label="Name" name="name"
                 rules={[{ required: true, message: 'Please input admin structure type name!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Description" name="description"
                 rules={[{ required: true, message: 'Please input admin structure type description!' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
  </>
}
