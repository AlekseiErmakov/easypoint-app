import {ColumnsType} from "antd/es/table";
import {toDateString} from "../../hooks";
import React from "react";
import {IPoint} from "./index";
import {Popover, Table} from "antd";
import {IEmployee} from "../employee";

const columns: ColumnsType<IPoint> = [
    {
        title: 'Point type',
        dataIndex: 'pointType',
        key: 'pointType',
        render: (value) => <Popover content={value.description} title={value.name}>
            <div>{value.name}</div>
        </Popover>
    },
    {
        title: 'Point state',
        dataIndex: 'pointState',
        key: 'pointState',
        render: (value) => <Popover content={value.description} title={value.name}>
            <div>{value.name}</div>
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
        render: value => value.toFixed(3)
    },
    {
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
        render:(value: IEmployee) => `${value.surname} ${value.firstname}`
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

interface PointTableProps {
    points: IPoint[];
}

const PointTable = (props: PointTableProps) => {
    return (
        <Table columns={columns} dataSource={props.points} rowKey={(it)=> (it.id)}/>
    )
}

export default PointTable;