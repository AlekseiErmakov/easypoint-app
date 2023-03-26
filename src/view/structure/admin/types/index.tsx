import React, { useState } from 'react'
import { Form, Modal } from 'antd'
import EpButton from '../../../../components/Button'
import { PlusOutlined } from '@ant-design/icons'
import AdminStructureTypeForm from './AdminStructureTypeForm'
import AdminStructureTypeTable from './AdminStructureTypeTable'
import {
  useCreateAdminStructureTypeMutation,
  useSearchAdminStructureTypeQuery
} from '../../../../api/adminStructureType'

export interface IAdminStructureType {
  id: number
  name: string
  description: string
}

export interface AdminStructureTypeCreateRequest {
  name: string
  description: string
}

const AdminStructureTypePage = () => {
  const { data } = useSearchAdminStructureTypeQuery()
  const [showAddModal, setShowAddModal] = useState(false)
  const [addAdminStructureType] = useCreateAdminStructureTypeMutation()
  const [form] = Form.useForm()
  const showModal = () => {
    setShowAddModal(true)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleOk = (adminStructureTypeCreateRequest: AdminStructureTypeCreateRequest): void => {
    addAdminStructureType(adminStructureTypeCreateRequest)
    form.resetFields()
    setShowAddModal(false)
  }

  return <>
    <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
    <AdminStructureTypeTable adminStructureTypes={(data != null) ? data : []}/>
    <Modal title="Add admin structure type" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
      <AdminStructureTypeForm onFinish={handleOk} form={form}/>
    </Modal>
  </>
}

export default AdminStructureTypePage
