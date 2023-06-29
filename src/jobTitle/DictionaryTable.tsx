import {type ColumnsType} from 'antd/es/table'
import {Table} from 'antd'
import {Dictionary} from './index'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import React from 'react'

interface DictionaryTableProps<T extends Dictionary> {
    dictionaries: T[]
    showUpdateModal: (dictionary: T) => void
    showDeleteModal: (dictionary: T) => void
    extraColumns?: ColumnsType<T>[]
}

function DictionaryTable<T extends Dictionary>(props: DictionaryTableProps<T>) {
    const columns: ColumnsType<T> = [
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
            render: (_, dictionary) => {
                return <div onClick={_ => {
                    props.showUpdateModal(dictionary)
                }}><EditOutlined/></div>
            }
        },
        {
            title: 'Delete',
            width: 80,
            render: (_, dictionary) => {
                return <div onClick={_ => {
                    props.showDeleteModal(dictionary)
                }}><DeleteOutlined/></div>
            }
        }
    ]
    return <Table columns={columns} dataSource={props.dictionaries} rowKey={it => it.id}/>
}

export default DictionaryTable
