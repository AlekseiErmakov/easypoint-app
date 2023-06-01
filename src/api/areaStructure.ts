import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {
  type AreaStructureCreateRequest,
  type AreaStructureLinkRequest,
  type Area,
  type AreaStructure,
  type TreeAreaStructure
} from '../view/structure/area'
import { toTreeNode } from './trenode'
import {BASE_URL} from "./costants";

export const areaStructureApi = createApi({
  reducerPath: 'easyPoint/areaStructure',
  refetchOnFocus: true,
  tagTypes: ['AREA_STRUCTURE'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/areas`,
    credentials: 'include'
  }),
  endpoints: build => ({
    searchAreaStructure: build.query<TreeAreaStructure[], void>({
      query: () => ({
        url: '/structure',
        method: 'GET'
      }),
      transformResponse: (response: AreaStructure[]): TreeAreaStructure[] => {
        return response.map(it => toTreeNode(it))
      },
      providesTags: ['AREA_STRUCTURE']
    }),
    searchAreas: build.query<Area[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['AREA_STRUCTURE']
    }),
    createAreaStructure: build.mutation<void, AreaStructureCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['AREA_STRUCTURE']
    }),
    linkAreaStructure: build.mutation<void, AreaStructureLinkRequest>({
      query: (body) => ({
        url: '/link',
        method: 'POST',
        body
      }),
      invalidatesTags: ['AREA_STRUCTURE']
    })
  })
})

export const {
  useSearchAreaStructureQuery,
  useSearchAreasQuery,
  useCreateAreaStructureMutation,
  useLinkAreaStructureMutation
} = areaStructureApi
