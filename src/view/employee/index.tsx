import React, { useState } from 'react'
import { Form, Modal } from 'antd'
import { useCreateEmployeeMutation, useSearchEmployeesQuery } from '../../api/employee'
import EmployeeTable from './EmployeeTable'
import { UserAddOutlined } from '@ant-design/icons'
import EmployeeForm from './EmployeeForm'
import EpButton from '../../components/Button'
import { type IAdminStructure } from '../structure/admin'
import { useSearchAdminsQuery } from '../../api/adminStructure'
import {jsx} from '@emotion/react';
import JSX = jsx.JSX;

export interface IEmployee {
  id: number
  firstname: string
  surname: string
  lastname: string
  adminStructures: IAdminStructure[]
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
  const admins = useSearchAdminsQuery()
  const { data, isLoading } = useSearchEmployeesQuery()
  const [addEmployee] = useCreateEmployeeMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = (employee: EmployeeCreateRequest) => {
    addEmployee(employee)
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return <>
    <EpButton onClick={showModal} icon={<UserAddOutlined/>}/>
    {isLoading ? <h1>Loading</h1> : <EmployeeTable employees={(data != null) ? data : []}/>}
    <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
      <EmployeeForm onFinish={handleOk} form={form} adminStructures={(admins.data != null) ? admins.data : []}/>
    </Modal>
  </>
}

export default EmployeePage
