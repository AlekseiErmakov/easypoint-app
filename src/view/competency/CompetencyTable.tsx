import { type ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import { type Competency } from './index'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'

interface CompetencyTableProps {
  competencies: Competency[]
  showUpdateModal: (competency: Competency) => void
  showDeleteModal: (competency: Competency) => void
}

const CompetencyTable = (props: CompetencyTableProps): JSX.Element => {
  const columns: ColumnsType<Competency> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Update',
      width: 90,
      render: (_, competency) => {
        return <div onClick={_ => { props.showUpdateModal(competency) }}><EditOutlined/></div>
      }
    },
    {
      title: 'Delete',
      width: 80,
      render: (_, competency) => {
        return <div onClick={_ => {
          props.showDeleteModal(competency)
        }}><DeleteOutlined/></div>
      }
    }
  ]
  return <Table columns={columns} dataSource={props.competencies} rowKey={it => it.id}/>
}

export default CompetencyTable
