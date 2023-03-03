import {getMoment, toDateString} from "../../hooks";
import {ColumnsType} from "antd/es/table";
import {Table} from "antd";
import React, {CSSProperties} from "react";
import {IEmployee} from "./index";


const columns: ColumnsType<IEmployee> = [
    {
        title: 'Firstname',
        dataIndex: 'firstname',
        key: 'firstname'
    },
    {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'Patronymic',
        dataIndex: 'lastname',
        key: 'lastname',
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
];


export interface EmployeeTableProps {
    employees: IEmployee[]
}

const EmployeeTable = (props: EmployeeTableProps) => {
    return <>
        {<Table columns={columns} dataSource={props.employees} rowKey={(it)=> (it.id)} />}
    </>
}

export default EmployeeTable;