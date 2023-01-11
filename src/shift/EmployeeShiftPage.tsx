import {useBackEnd} from "../hooks/EmployeeHooks";
import WorkShiftTable from "./WorkShiftTable";

export interface IEmployeeShiftType {
    id: number;
    name: string;
    shortname: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
}


export interface IEmployeeShiftTypeCreateRequest {
    name: string;
    shortname: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
}


export default function EmployeeShiftPage() {
    const {data, addData} = useBackEnd<IEmployeeShiftType, IEmployeeShiftTypeCreateRequest>('/work-shift-types');
    console.log(data);
    return <WorkShiftTable data={data}/>
}