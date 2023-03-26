import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { toTreeNode } from './trenode'
import { type IAdmin, type IAdminStructure, type TreeAdminStructure } from '../view/structure/admin'
import { type AdminStructureTypeCreateRequest } from '../view/structure/admin/types'

export const adminStructureApi = createApi({
  reducerPath: 'easyPoint/adminStructure',
  refetchOnFocus: true,
  tagTypes: ['ADMIN_STRUCTURE'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/admin',
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAdminStructure: build.query<TreeAdminStructure[], void>({
      query: () => ({
        url: '/structure',
        method: 'GET'
      }),
      transformResponse: (response: IAdminStructure[]): TreeAdminStructure[] => {
        return response.map(it => toTreeNode(it))
      },
      providesTags: ['ADMIN_STRUCTURE']
    }),
    searchAdmins: build.query<IAdmin[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['ADMIN_STRUCTURE']
    }),
    createAdminStructure: build.mutation<void, AdminStructureTypeCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['ADMIN_STRUCTURE']
    })
  })
})

export const {
  useSearchAdminStructureQuery,
  useSearchAdminsQuery,
  useCreateAdminStructureMutation
} = adminStructureApi
