import {IEmployee} from "../employees/interface/Employee";
import {useEffect, useState} from "react";
import {proxyAxios} from "../backend/Constant";

export interface Response{
    employees: IEmployee[]
}
export function useEmployees(): Response {
    const [employees, setEmployees] = useState<IEmployee[]>();
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
    return {
        employees: employees === undefined ? [] : employees
    };
}