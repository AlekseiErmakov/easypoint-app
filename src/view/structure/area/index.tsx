import { type IAreaStructureType } from './types'
import React, { useState } from 'react'
import { Col, Form, Modal, Row, Tree, type TreeDataNode } from 'antd'
import {
  useCreateAreaStructureMutation,
  useSearchAreasQuery,
  useSearchAreaStructureQuery
} from '../../../api/areaStructure'
import { PlusOutlined } from '@ant-design/icons'
import { AreaStructureForm } from './AreaStructureForm'
import { useSearchAreaStructureTypeQuery } from '../../../api/areaStructureType'
import EpButton from '../../../components/Button'

export interface IAreaStructure {
  id: number
  name: string
  description: string
  parent?: IAreaStructure
  children: IAreaStructure[]
  areaStructureType: IAreaStructureType
}

export interface TreeAreaStructure extends TreeDataNode {
  value: number
  description: string
  label: string
  parent?: IAreaStructure
  areaStructureType: IAreaStructureType
}

export interface AreaStructureCreateRequest {
  name: string
  description: string
  areaStructureTypeId?: number
  parentId?: number
}

export interface AreaStructureLinkRequest {
  childId: number
  parentId: number
}

export interface IArea {
  id: number
  name: string
  description: string
  areaStructureType: IAreaStructureType
}

const AreaStructurePage = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const { data } = useSearchAreaStructureQuery()
  const [createAreaStructure] = useCreateAreaStructureMutation()
  const areas = useSearchAreasQuery()
  const areaStructureTypes = useSearchAreaStructureTypeQuery()

  const [form] = Form.useForm()
  const showModal = (): void => {
    setShowAddModal(true)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleOk = (areaStructure: AreaStructureCreateRequest): void => {
    console.log(areaStructure)
    createAreaStructure(areaStructure)
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
    <Modal title="Add area" open={showAddModal} onOk={form.submit} onCancel={handleCancel} width={500}>
      <AreaStructureForm onFinish={handleOk} form={form} areas={(areas.data != null) ? areas.data : []}
                         areaStructureTypes={(areaStructureTypes.data != null) ? areaStructureTypes.data : []}/>
    </Modal>
  </div>
}

export default AreaStructurePage
