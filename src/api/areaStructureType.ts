import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { type AreaStructureTypeCreateRequest, type AreaStructureType } from '../view/structure/area/types'
import {BASE_URL} from "./costants";

export const areaStructureTypeApi = createApi({
  reducerPath: 'easyPoint/areaStructureType',
  refetchOnFocus: true,
  tagTypes: ['AREA_STRUCTURE_TYPE'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/area-structure-types`,
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAreaStructureType: build.query<AreaStructureType[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['AREA_STRUCTURE_TYPE']
    }),
    createAreaStructureType: build.mutation<void, AreaStructureTypeCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['AREA_STRUCTURE_TYPE']
    })
  })
})

export const { useSearchAreaStructureTypeQuery, useCreateAreaStructureTypeMutation } = areaStructureTypeApi
