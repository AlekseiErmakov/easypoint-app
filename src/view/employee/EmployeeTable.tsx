import { toDateString } from '../../hooks'
import { type ColumnsType } from 'antd/es/table'
import { Table, Tag } from 'antd'
import React from 'react'
import { type IEmployee } from './index'
import { jsx } from '@emotion/react'
import JSX = jsx.JSX

const columns: ColumnsType<IEmployee> = [
  {
    title: 'Place in company',
    dataIndex: 'adminStructures',
    key: 'adminStructures',
    width: 100,
    render: (_, { administrativeUnits }) => (
      <>
        {administrativeUnits.map((administrativeUnit) => {
          return (
            <div key={administrativeUnit.id}>
              <Tag color={'blue'} key={administrativeUnit.name}>
                {administrativeUnit.name.toUpperCase()}
              </Tag>
            </div>
          )
        })}
      </>
    )
  },
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    key: 'firstname'
  },
  {
    title: 'Surname',
    dataIndex: 'surname',
    key: 'surname'
  },
  {
    title: 'Patronymic',
    dataIndex: 'lastname',
    key: 'lastname'
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'creates',
    render: (value) => <span>{toDateString(value)}</span>
  },
  {
    title: 'Updated',
    dataIndex: 'updated',
    key: 'updated',
    render: (value) => <span>{toDateString(value)}</span>
  }
]

export interface EmployeeTableProps {
  employees: IEmployee[]
}

const EmployeeTable = (props: EmployeeTableProps): JSX.Element => {
  return <>
    {<Table columns={columns} dataSource={props.employees} rowKey={(it) => (it.id)}/>}
  </>
}

export default EmployeeTable
