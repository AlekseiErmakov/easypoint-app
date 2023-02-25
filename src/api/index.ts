import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {RootState} from "../index";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export const baseUrl = "http://localhost:8080"

// export const baseQuery = fetchBaseQuery({
//     credentials: 'include',
//     prepareHeaders: (headers, {getState}) => {
//         console.log('preparing headers')
//         console.log(getState())
//         const token = (getState() as RootState)?.auth?.user?.token
//         console.log(token)
//         // if (token) {
//         //     headers.set('Authorization', `Bearer ${token}`);
//         // }
//         console.log('prepared headers ' + token)
//     }
// })

export function useDebounce(delay = 300): string {
    const [debounced, setDebounced] = useState('')
    let value = 'value'
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])

    return debounced
}

