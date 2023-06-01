import { type AreaStructureType } from './index'
import { type ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import React from "react";

const columns: ColumnsType<AreaStructureType> = [
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

interface AreaStructureTypeTableProps {
  areaStructureTypes: AreaStructureType[]
}

const AreaStructureTypeTable = (props: AreaStructureTypeTableProps): JSX.Element => {
  return <Table columns={columns} dataSource={props.areaStructureTypes} rowKey={it => it.id}/>
}

export default AreaStructureTypeTable
