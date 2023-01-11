import React from "react";
import {IEmployeeShiftType} from "./EmployeeShiftPage";
import EasyPointTable, {Column, EasyPointTableRow} from "../uikit/EasyPointTable";


interface WorkShiftTableProp {
    data: IEmployeeShiftType[]
}

interface IWorkShiftTable extends EasyPointTableRow {
    name: string;
    shortname: string;
    startTime: string;
    endTime: string;
}

interface IWorkShiftTableColumn extends Column<'name' | 'shortname' | 'startTime' | 'endTime'> {

}

const columns: IWorkShiftTableColumn[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {
        id: 'shortname', label: 'Shortname', minWidth: 100
    },
    {
        id: 'startTime',
        label: 'Start time',
        minWidth: 170,
        align: 'right'
    },

    {
        id: 'endTime',
        label: 'End time',
        minWidth: 170,
        align: 'right'
    }
];

export default function WorkShiftTable(prop: WorkShiftTableProp) {
    const workShiftTypes: IWorkShiftTable[] = prop.data.map(e => {
        return {
            id: e.id.toString(),
            name: e.name,
            shortname: e.shortname,
            startTime: e.startHour + ':' + e.startMinute,
            endTime: e.endHour + ':' + e.endMinute
        }
    })
    const getValue = (columnId: string, object: EasyPointTableRow) => {
        // @ts-ignore
        return object[columnId];
    }
    return <EasyPointTable data={workShiftTypes} columns={columns} getValue={getValue}/>;
}