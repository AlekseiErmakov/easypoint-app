import { Col, Form, Modal, Row, Tree, type TreeDataNode } from 'antd'
import { type IAdministrativeUnitType } from './types'
import React, { useState } from 'react'
import EpButton from '../../../components/Button'
import { PlusOutlined } from '@ant-design/icons'
import {
  useCreateAdministrativeUnitMutation,
  useSearchAdministrativeUnitsQuery,
  useSearchAdministrativeUnitTreeQuery
} from '../../../api/adminStructure'
import { useSearchAdminStructureTypeQuery } from '../../../api/adminStructureType'
import { AdminStructureForm } from './AdminStructureForm'

export interface IAdministrativeUnit {
  id: number
  name: string
  description: string
  parent?: IAdministrativeUnit
  children: IAdministrativeUnit[]
  administrativeUnitType: IAdministrativeUnitType
}

export interface AdministrativeUnitTree extends TreeDataNode {
  value: number
  description: string
  label: string
  parent?: IAdministrativeUnit
  administrativeUnitType: IAdministrativeUnitType
}

export interface AdministrativeUnitCreateRequest {
  name: string
  description: string
  administrativeUnitType?: number
  parentId?: number
}

export interface ISimpleAdministrativeUnit {
  id: number
  name: string
  description: string
  administrativeUnitType: IAdministrativeUnitType
}

const AdminStructurePage = (): JSX.Element => {
  const [showAddModal, setShowAddModal] = useState(false)
  const { data } = useSearchAdministrativeUnitTreeQuery()
  const [createAdministrativeUnit] = useCreateAdministrativeUnitMutation()
  const administrativeUnits = useSearchAdministrativeUnitsQuery()
  const administrativeUnitTypes = useSearchAdminStructureTypeQuery()

  const [form] = Form.useForm()
  const showModal = (): void => {
    setShowAddModal(true)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleOk = (adminStructure: AdministrativeUnitCreateRequest): void => {
    void createAdministrativeUnit(adminStructure)
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
      <AdminStructureForm onFinish={handleOk} form={form} administrativeUnits={(administrativeUnits.data != null) ? administrativeUnits.data : []}
                          administrativeUnitTypes={(administrativeUnitTypes.data != null) ? administrativeUnitTypes.data : []}/>
    </Modal>
  </div>
}

export default AdminStructurePage
