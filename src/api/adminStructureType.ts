import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { type AdministrativeUnitTypeCreateRequest, type AdministrativeUnitType } from '../view/structure/admin/types'
import {BASE_URL} from "./costants";

export const adminStructureTypeApi = createApi({
  reducerPath: 'easyPoint/adminStructureType',
  refetchOnFocus: true,
  tagTypes: ['ADMINISTRATIVE_UNIT_TYPE'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/administrative-unit-types`,
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAdminStructureType: build.query<AdministrativeUnitType[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['ADMINISTRATIVE_UNIT_TYPE']
    }),
    createAdminStructureType: build.mutation<void, AdministrativeUnitTypeCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['ADMINISTRATIVE_UNIT_TYPE']
    })
  })
})

export const { useSearchAdminStructureTypeQuery, useCreateAdminStructureTypeMutation } = adminStructureTypeApi
