import { type ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import { type AdministrativeUnitType } from './index'
import React from 'react'

const columns: ColumnsType<AdministrativeUnitType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  }
]

interface AdminStructureTypeTableProps {
  adminStructureTypes: AdministrativeUnitType[]
}

const AdminStructureTypeTable = (props: AdminStructureTypeTableProps): JSX.Element => {
  return <Table columns={columns} dataSource={props.adminStructureTypes} rowKey={it => it.id}/>
}

export default AdminStructureTypeTable
