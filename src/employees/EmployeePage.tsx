import React from "react";
import {useEmployees} from "../hooks/EmployeeHooks";
import {IEmployee} from "./interface/Employee";


function EmployeePage() {
    console.log("I am loading Employee page")
    const employees = useEmployees();
    console.log(employees)
    return <div>Employee page</div>
}

export default EmployeePage;