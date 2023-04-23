import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { type IJobTitle, type JobTitleCreateRequest, type JobTitleUpdateRequest } from '../view/jobTitle'

export const jobTitleApi = createApi({
  reducerPath: 'easyPoint/jobTitles',
  refetchOnFocus: true,
  tagTypes: ['JOB_TITLE'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/job-titles',
    credentials: 'include'
  }),
  endpoints: build => ({
    searchJobTitles: build.query<IJobTitle[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['JOB_TITLE']
    }),
    createJobTitle: build.mutation<void, JobTitleCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['JOB_TITLE']
    }),
    updateJobTitle: build.mutation<void, JobTitleUpdateRequest>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PATCH',
        body: {
          name: body.name,
          description: body.description
        }
      }),
      invalidatesTags: ['JOB_TITLE']
    }),
    deleteJobTitle: build.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['JOB_TITLE']
    })
  })
})

export const { useCreateJobTitleMutation, useUpdateJobTitleMutation, useSearchJobTitlesQuery, useDeleteJobTitleMutation } = jobTitleApi
