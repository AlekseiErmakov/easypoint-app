import * as React from 'react';
import {IEmployee} from "../interface/Employee";
import EasyPointTable, {Column, EasyPointTableRow} from "../../uikit/EasyPointTable";

interface EmployeeTableProp {
    employees: IEmployee[]
}

interface ITableEmployee extends EasyPointTableRow {
    fullName: string,
    created: String,
    updated: String
}

interface EmployeeColumn extends Column<'fullName' | 'created' | 'updated'> {

}

const columns: EmployeeColumn[] = [
    {id: 'fullName', label: 'Full name', minWidth: 170},
    {
        id: 'created', label: 'Created', minWidth: 100,
        format: (value: Date) => value.toLocaleString('en-US')
    },
    {
        id: 'updated',
        label: 'Updated',
        minWidth: 170,
        align: 'right',
        format: (value: Date) => value.toLocaleString('en-US')
    }
];


export default function EmployeeTable(prop: EmployeeTableProp) {
    const employees: ITableEmployee[] = prop.employees.map(e => {
        return {
            id: e.id.toString(),
            fullName: e.surname + ' ' + e.firstname + ' ' + e.middlename,
            created: e.created.toString(),
            updated: e.updated.toString()
        }
    })
    const getValue = (columnId: string, object: EasyPointTableRow) => {
        let value: String = '';
        if ('fullName' || columnId === 'created' || columnId === 'updated'){
            // @ts-ignore
            value = object[columnId];
        }
        return value;
    }
    return <EasyPointTable data={employees} columns={columns} getValue={getValue}/>;
}




