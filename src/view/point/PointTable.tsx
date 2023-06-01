import { type ColumnsType } from 'antd/es/table'
import { toDateString } from '../../hooks'
import React from 'react'
import { type Point, PointStates } from './index'
import { Popover, Table, Tag } from 'antd'
import { type Employee } from '../employee'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface PointTableProps {
  points: Point[]
  showDeleteModal: (point: Point) => void
  showUpdateModel: (point: Point) => void
}

const PointTable = (props: PointTableProps): JSX.Element => {
  const columns: ColumnsType<Point> = [
    {
      title: 'Location',
      key: 'areas',
      width: 150,
      dataIndex: 'pointAreas',
      render: (_, { areas }) => (
        <>
          {areas.map((pointArea) => {
            return (
              <Tag color={'blue'} key={pointArea.name}>
                {pointArea.name.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Point type',
      dataIndex: 'pointType',
      key: 'pointType',
      render: (value) => <Popover content={value ? value.description : 'NONE'}
                                  title={value ? value.name : 'NONE'}>
        <div>{(value) ? value.name : 'NONE'}</div>
      </Popover>
    },
    {
      title: 'Point state',
      dataIndex: 'pointState',
      key: 'pointState',
      render: (value) => <Popover content={value ? value.description : 'NONE'}
                                  title={value ? value.name : 'NONE'}>
        <div>{value ? value.name : 'NONE'}</div>
      </Popover>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'X coordinate',
      dataIndex: 'x',
      key: 'x',
      render: value => value.toFixed(3)
    },
    {
      title: 'Y coordinate',
      dataIndex: 'y',
      key: 'y',
      render: value => value.toFixed(3)
    },
    {
      title: 'H coordinate',
      dataIndex: 'h',
      key: 'h',
      render: value => value ? value.toFixed(3) : 'NONE'
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (value: Employee) => `${value ? value.surname : 'NONE'} ${value ? value.firstname : 'NONE'}`
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
    },
    {
      title: 'Update',
      width: 90,
      render: (_, point) => {
        return point.pointState.code === PointStates.CREATED
          ? <div onClick={_ => { props.showUpdateModel(point) }}><EditOutlined/></div>
          : <div></div>
      }
    },
    {
      title: 'Delete',
      width: 80,
      render: (_, point) => {
        return point.pointState.code === PointStates.CREATED
          ? <div onClick={_ => { props.showDeleteModal(point) }}><DeleteOutlined/></div>
          : <div></div>
      }
    }
  ]

  return (
    <Table columns={columns} dataSource={props.points} rowKey={(it) => (it.id)} tableLayout={'fixed'}/>
  )
}

export default PointTable
