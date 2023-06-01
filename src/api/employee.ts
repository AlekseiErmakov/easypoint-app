import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type EmployeeCreateRequest, type Employee } from '../view/employee'
import {BASE_URL} from "./costants";

export const employeeApi = createApi({
  reducerPath: 'easyPoint/employee',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/employees`,
    credentials: 'include'
  }),
  tagTypes: ['Employees', 'Employee'],
  refetchOnFocus: true,
  endpoints: build => ({
    searchEmployees: build.query<Employee[], void>({
      query: () => ({
        url: ''
      }),
      providesTags: ['Employees']
    }),
    searchEmployee: build.query<Employee[], number>({
      query: (id) => ({
        url: `/${id}`
      }),
      providesTags: ['Employee']
    }),
    createEmployee: build.mutation<Employee, EmployeeCreateRequest>({
      query (body) {
        return {
          url: '',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Employees' }]
    })
  })
})

export const { useSearchEmployeesQuery, useSearchEmployeeQuery, useCreateEmployeeMutation } = employeeApi
