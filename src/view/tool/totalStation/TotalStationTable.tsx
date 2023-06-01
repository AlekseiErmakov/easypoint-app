import { type TotalStation } from './index'
import { type ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import React from 'react'

interface TotalStationTableProps {
  totalStations: TotalStation[]
}

const TotalStationTable = (props: TotalStationTableProps) => {
  const columns: ColumnsType<TotalStation> = [
    {
      title: 'Firm',
      dataIndex: 'firm',
      key: 'firm'
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'Serial number',
      dataIndex: 'serialNumber',
      key: 'serialNumber'
    }
  ]
  return <Table dataSource={props.totalStations} columns={columns} rowKey={(it) => it.id}/>
}

export default TotalStationTable
