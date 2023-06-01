import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { type Point, type PointCreateRequest, type PointState, type PointType, type PointUpdateRequest } from '../view/point'
import {BASE_URL} from "./costants";

export const pointApi = createApi({
  reducerPath: 'easyPoint/point',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/points`,
    credentials: 'include'
  }),
  tagTypes: ['Points'],
  refetchOnFocus: true,
  endpoints: build => ({
    searchPoints: build.query<Point[], void>({
      query: () => ({
        url: ''
      }),
      providesTags: ['Points']
    }),
    createPoint: build.mutation<Point, PointCreateRequest>({
      query (body) {
        return {
          url: '',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Points' }]
    }),
    updatePoint: build.mutation<Point, PointUpdateRequest>({
      query (body) {
        return {
          url: `/${body.id}`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Points' }]
    }),
    deletePoint: build.mutation<void, number>({
      query (pointId) {
        return {
          url: `/${pointId}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: [{ type: 'Points' }]
    }),
    savePointCsv: build.mutation<void, FormData>({
      query (file) {
        return {
          url: '/csv',
          method: 'POST',
          body: file
        }
      },
      invalidatesTags: [{ type: 'Points' }]
    })
  })
})

export const {
  useCreatePointMutation,
  useSearchPointsQuery,
  useDeletePointMutation,
  useSavePointCsvMutation,
  useUpdatePointMutation
} = pointApi

export const pointTypeApi = createApi({
  reducerPath: 'easyPoint/pointTypes',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: BASE_URL
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchPointTypes: build.query<PointType[], void>({
      query: () => ({
        url: '/point-type'
      })
    })
  })
})
export const { useSearchPointTypesQuery } = pointTypeApi
export const pointStateApi = createApi({
  reducerPath: 'easyPoint/pointStates',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: BASE_URL
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchPointStates: build.query<PointState[], any>({
      query: () => ({
        url: '/point-state'
      })
    })
  })
})
export const { useSearchPointStatesQuery } = pointStateApi
