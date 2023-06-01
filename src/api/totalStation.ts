import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { type TotalStation, type TotalStationCreateRequest } from '../view/tool/totalStation'
import {BASE_URL} from "./costants";

export const totalStationApi = createApi({
  reducerPath: 'easyPoint/tool/totalStation',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: `${BASE_URL}/tools/total-stations`
  }),
  tagTypes: ['TOTAL_STATION'],
  refetchOnFocus: true,
  endpoints: build => ({
    searchTotalStations: build.query<TotalStation[], void>({
      query: (arg) => {
        return {
          url: '',
          method: 'GET'
        }
      },
      providesTags: ['TOTAL_STATION']
    }),
    createTotalStation: build.mutation<void, TotalStationCreateRequest>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['TOTAL_STATION']
    })
  })
})

export const { useSearchTotalStationsQuery, useCreateTotalStationMutation } = totalStationApi
