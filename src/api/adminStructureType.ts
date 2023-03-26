import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { type AdminStructureTypeCreateRequest, type IAdminStructureType } from '../view/structure/admin/types'

export const adminStructureTypeApi = createApi({
  reducerPath: 'easyPoint/adminStructureType',
  refetchOnFocus: true,
  tagTypes: ['ADMIN_STRUCTURE_TYPE'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/admin-structure-types',
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAdminStructureType: build.query<IAdminStructureType[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['ADMIN_STRUCTURE_TYPE']
    }),
    createAdminStructureType: build.mutation<void, AdminStructureTypeCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['ADMIN_STRUCTURE_TYPE']
    })
  })
})

export const { useSearchAdminStructureTypeQuery, useCreateAdminStructureTypeMutation } = adminStructureTypeApi
