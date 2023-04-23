import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { type CompetencyCreateRequest, type CompetencyUpdateRequest, type ICompetency } from '../view/competency'

export const competencyApi = createApi({
  reducerPath: 'easyPoint/competencies',
  refetchOnFocus: true,
  tagTypes: ['COMPETENCY'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/competencies',
    credentials: 'include'
  }),
  endpoints: build => ({
    searchCompetencies: build.query<ICompetency[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['COMPETENCY']
    }),
    createCompetency: build.mutation<void, CompetencyCreateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['COMPETENCY']
    }),
    updateCompetency: build.mutation<void, CompetencyUpdateRequest>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PATCH',
        body: {
          name: body.name,
          description: body.description
        }
      }),
      invalidatesTags: ['COMPETENCY']
    }),
    deleteCompetency: build.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['COMPETENCY']
    })
  })
})

export const { useCreateCompetencyMutation, useUpdateCompetencyMutation, useSearchCompetenciesQuery, useDeleteCompetencyMutation } = competencyApi
