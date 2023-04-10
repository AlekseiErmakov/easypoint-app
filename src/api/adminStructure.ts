import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { toAdministrativeUnitTree } from './trenode'
import {
  type IAdministrativeUnit,
  type AdministrativeUnitTree,
  type ISimpleAdministrativeUnit, AdministrativeUnitCreateRequest
} from '../view/structure/admin'

export const administrativeUnitApi = createApi({
  reducerPath: 'easyPoint/administrativeUnit',
  refetchOnFocus: true,
  tagTypes: ['ADMINISTRATIVE_UNIT'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/administrative-units',
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAdministrativeUnitTree: build.query<AdministrativeUnitTree[], void>({
      query: () => ({
        url: '/structure',
        method: 'GET'
      }),
      transformResponse: (response: IAdministrativeUnit[]): AdministrativeUnitTree[] => {
        return response.map(it => toAdministrativeUnitTree(it))
      },
      providesTags: ['ADMINISTRATIVE_UNIT']
    }),
    searchAdministrativeUnits: build.query<ISimpleAdministrativeUnit[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['ADMINISTRATIVE_UNIT']
    }),
    createAdministrativeUnit: build.mutation<void, AdministrativeUnitCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['ADMINISTRATIVE_UNIT']
    })
  })
})

export const {
  useSearchAdministrativeUnitTreeQuery,
  useSearchAdministrativeUnitsQuery,
  useCreateAdministrativeUnitMutation
} = administrativeUnitApi
