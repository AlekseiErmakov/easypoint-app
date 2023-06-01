import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { toAdministrativeUnitTree } from './trenode'
import {
  type AdministrativeUnit,
  type AdministrativeUnitTree,
  type SimpleAdministrativeUnit, type AdministrativeUnitCreateRequest
} from '../view/structure/admin'
import {BASE_URL} from "./costants";

export const administrativeUnitApi = createApi({
  reducerPath: 'easyPoint/administrativeUnit',
  refetchOnFocus: true,
  tagTypes: ['ADMINISTRATIVE_UNIT'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/administrative-units`,
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAdministrativeUnitTree: build.query<AdministrativeUnitTree[], void>({
      query: () => ({
        url: '/structure',
        method: 'GET'
      }),
      transformResponse: (response: AdministrativeUnit[]): AdministrativeUnitTree[] => {
        return response.map(it => toAdministrativeUnitTree(it))
      },
      providesTags: ['ADMINISTRATIVE_UNIT']
    }),
    searchAdministrativeUnits: build.query<SimpleAdministrativeUnit[], void>({
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
