import { toDateString } from '../../hooks'
import { type ColumnsType } from 'antd/es/table'
import { Table, Tag } from 'antd'
import React from 'react'
import employee, { type Employee } from './index'
import { jsx } from '@emotion/react'
import JSX = jsx.JSX
import { useNavigate } from 'react-router-dom'

const columns: ColumnsType<Employee> = [
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
  employees: Employee[]
}

const EmployeeTable = (props: EmployeeTableProps): JSX.Element => {
  const navigate = useNavigate()

  return <Table columns={columns} dataSource={props.employees} rowKey={(it) => (it.id)} onRow={(employee, row) => {
      return {
        onClick: event => {
          navigate(`/employees/${employee.id}`)
        }
      }
    }}/>
}

export default EmployeeTable
