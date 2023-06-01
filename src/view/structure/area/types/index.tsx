import React, { useState } from 'react'
import { Form, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateAreaStructureTypeMutation, useSearchAreaStructureTypeQuery } from '../../../../api/areaStructureType'
import AreaStructureTypeTable from './AreaStructureTypeTable'
import AreaStructureTypeForm from './AreaStructureTypeForm'
import EpButton from '../../../../components/Button'

export interface AreaStructureType {
  id: number
  name: string
  description: string
}

export interface AreaStructureTypeCreateRequest {
  name: string
  description: string
}

const AreaStructureTypePage = (): JSX.Element => {
  const { data } = useSearchAreaStructureTypeQuery()
  const [showAddModal, setShowAddModal] = useState(false)
  const [addAreaStructureType] = useCreateAreaStructureTypeMutation()
  const [form] = Form.useForm()
  const showModal = (): void => {
    setShowAddModal(true)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleOk = (areaStructureType: AreaStructureTypeCreateRequest): void => {
    void addAreaStructureType(areaStructureType)
    form.resetFields()
    setShowAddModal(false)
  }

  return <>
    <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
    <AreaStructureTypeTable areaStructureTypes={(data != null) ? data : []}/>
    <Modal title="Add total station" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
      <AreaStructureTypeForm onFinish={handleOk} form={form}/>
    </Modal>
  </>
}

export default AreaStructureTypePage
