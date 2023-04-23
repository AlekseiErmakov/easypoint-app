import { type ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import { type IJobTitle } from './index'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'

interface JobTitleTableProps {
  jobTitles: IJobTitle[]
  showUpdateModal: (iJobTitle: IJobTitle) => void
  showDeleteModal: (iJobTitle: IJobTitle) => void
}

const JobTitleTable = (props: JobTitleTableProps): JSX.Element => {
  const columns: ColumnsType<IJobTitle> = [
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
      render: (_, jobTitle) => {
        return <div onClick={_ => { props.showUpdateModal(jobTitle) }}><EditOutlined/></div>
      }
    },
    {
      title: 'Delete',
      width: 80,
      render: (_, jobTitle) => {
        return <div onClick={_ => {
          props.showDeleteModal(jobTitle)
        }}><DeleteOutlined/></div>
      }
    }
  ]
  return <Table columns={columns} dataSource={props.jobTitles} rowKey={it => it.id}/>
}

export default JobTitleTable
