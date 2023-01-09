import React from "react";
import {useEmployees} from "../hooks/EmployeeHooks";
import EmployeeTable from "./component/EmployeeTable";


function EmployeePage() {
    console.log("I am loading Employee page")
    const {employees, addEmployee} = useEmployees();
    console.log(employees)
    return <EmployeeTable employees={employees}/>
}

export default EmployeePage;