import React, { useState } from 'react'
import { Form, Modal } from 'antd'
import { useCreateEmployeeMutation, useSearchEmployeesQuery } from '../../api/employee'
import EmployeeTable from './EmployeeTable'
import { UserAddOutlined } from '@ant-design/icons'
import EmployeeForm from './EmployeeForm'
import EpButton from '../../components/Button'
import { type AdministrativeUnit } from '../structure/admin'
import { jsx } from '@emotion/react'
import JSX = jsx.JSX
import { useSearchAdministrativeUnitsQuery } from '../../api/adminStructure'

export interface Employee {
  id: number
  firstname: string
  surname: string
  lastname: string
  administrativeUnits: AdministrativeUnit[]
  created?: Date
  updated?: Date
}

export interface EmployeeCreateRequest {
  id: number
  firstname: string
  surname: string
  lastname: string
  adminStructures: number[]
}

const EmployeePage = (): JSX.Element => {
  const administrativeUnits = useSearchAdministrativeUnitsQuery()
  const { data, isLoading } = useSearchEmployeesQuery()
  const [addEmployee] = useCreateEmployeeMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleOk = (employee: EmployeeCreateRequest): void => {
    void addEmployee(employee)
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  return <>
    <EpButton onClick={showModal} icon={<UserAddOutlined/>}/>
    {isLoading ? <h1>Loading</h1> : <EmployeeTable employees={(data != null) ? data : []}/>}
    <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
      <EmployeeForm onFinish={handleOk} form={form} administrativeUnits={(administrativeUnits.data != null) ? administrativeUnits.data : []}/>
    </Modal>
  </>
}

export default EmployeePage
