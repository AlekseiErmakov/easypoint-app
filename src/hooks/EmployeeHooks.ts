import {IEmployee} from "../employees/interface/Employee";
import {useEffect, useState} from "react";
import {proxyAxios} from "../backend/Constant";

export interface UseEmployee{
    employees: IEmployee[],
    addEmployee: (employee: IEmployee) => void
}
export function useEmployees(): UseEmployee {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    // const [error, setError] = useState<String>();
    // const [loading, setLoading] = useState<Boolean>();
    useEffect(() => {
        proxyAxios.get<IEmployee[]>("/employee")
            .then(result => {
                if (result.data !== undefined) {
                    setEmployees(result.data)
                }
            })
    }, [])

    const addEmployee = (employee: IEmployee) => {
        setEmployees([...employees ,employee])
    }
    return {
        employees: employees,
        addEmployee: addEmployee
    };
}