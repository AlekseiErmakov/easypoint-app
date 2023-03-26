import { Col, Form, Modal, Row, Tree, type TreeDataNode } from 'antd'
import { type IAdminStructureType } from './types'
import React, { useState } from 'react'
import EpButton from '../../../components/Button'
import { PlusOutlined } from '@ant-design/icons'
import {
  useCreateAdminStructureMutation,
  useSearchAdminsQuery,
  useSearchAdminStructureQuery
} from '../../../api/adminStructure'
import { useSearchAdminStructureTypeQuery } from '../../../api/adminStructureType'
import { AdminStructureForm } from './AdminStructureForm'

export interface IAdminStructure {
  id: number
  name: string
  description: string
  parent?: IAdminStructure
  children: IAdminStructure[]
  areaStructureType: IAdminStructureType
}

export interface TreeAdminStructure extends TreeDataNode {
  value: number
  description: string
  label: string
  parent?: IAdminStructure
  areaStructureType: IAdminStructureType
}

export interface AdminStructureCreateRequest {
  name: string
  description: string
  areaStructureTypeId?: number
  parentId?: number
}

export interface IAdmin {
  id: number
  name: string
  description: string
  areaStructureType: IAdminStructureType
}

const AdminStructurePage = (): JSX.Element => {
  const [showAddModal, setShowAddModal] = useState(false)
  const { data } = useSearchAdminStructureQuery()
  const [createAdminStructure] = useCreateAdminStructureMutation()
  const admins = useSearchAdminsQuery()
  const adminStructureTypes = useSearchAdminStructureTypeQuery()

  const [form] = Form.useForm()
  const showModal = (): void => {
    setShowAddModal(true)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleOk = (adminStructure: AdminStructureCreateRequest): void => {
    console.log(adminStructure)
    createAdminStructure(adminStructure)
    form.resetFields()
    setShowAddModal(false)
  }
  return <div>
    <Row>
      <Col flex={2}><Tree
        className="draggable-tree"
        treeData={data}
        draggable
        blockNode
      /></Col>
      <Col flex={3}><EpButton onClick={showModal} icon={<PlusOutlined/>}/></Col>
    </Row>
    <Modal title="Add admin" open={showAddModal} onOk={form.submit} onCancel={handleCancel} width={500}>
      <AdminStructureForm onFinish={handleOk} form={form} areas={(admins.data != null) ? admins.data : []}
                          adminStructureTypes={(adminStructureTypes.data != null) ? adminStructureTypes.data : []}/>
    </Modal>
  </div>
}

export default AdminStructurePage
