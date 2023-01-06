import {IEmployee} from "../employees/interface/Employee";
import {useEffect, useState} from "react";
import {proxyAxios} from "../backend/Constant";



export function useEmployees() {
    const [employees, setEmployees] = useState<IEmployee[]>();
    const [error, setError] = useState<String>();
    const [loading, setLoading] = useState<Boolean>();
    useEffect(() => {
        proxyAxios.get<IEmployee[]>("/employee")
            .then(result => setEmployees(result.data))
    },[])
    return employees;
}