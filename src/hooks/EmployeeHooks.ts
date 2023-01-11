import {useEffect, useState} from "react";
import {proxyAxios} from "../backend/Constant";

export interface UseBackend<T, V> {
    data: T[],
    addData: (employee: V) => void
}

export function useBackEnd<T, V>(path: string): UseBackend<T, V> {
    const [items, setItems] = useState<T[]>([]);
    // const [error, setError] = useState<String>();
    // const [loading, setLoading] = useState<Boolean>();
    useEffect(() => {
        proxyAxios.get<T[]>(path)
            .then(result => {
                if (result.data !== undefined) {
                    setItems(result.data)
                }
            })
    }, [])

    const addItem = (item: V) => {
        proxyAxios.post<T>(path, item)
            .then(result => {
                if (result.data !== undefined) {
                    setItems([...items, result.data])
                }
            })
    }
    return {
        data: items,
        addData: addItem
    };
}