import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IEmployee} from "../view/employee";

export const employeeApi = createApi({
    reducerPath: 'easyPoint/employee',
    baseQuery: fetchBaseQuery({
        credentials: 'include'
    }),
    tagTypes: ['Employees'],
    refetchOnFocus: true,
    endpoints: build => ({
        searchEmployees: build.query<IEmployee[], void>({
            query: () => ({
                url: '/employee'
            }),
            providesTags: ['Employees']
        }),
        createEmployee: build.mutation<IEmployee, IEmployee>({
            query(body) {
                return {
                    url: `/employee`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Employees'}],
        })
    })
});


export const {useSearchEmployeesQuery, useCreateEmployeeMutation} = employeeApi;