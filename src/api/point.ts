import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPoint} from "../view/point";

export const pointApi = createApi({
    reducerPath: 'easyPoint/point',
    baseQuery: fetchBaseQuery({
        credentials: 'include'
    }),
    tagTypes: ['Points'],
    refetchOnFocus: true,
    endpoints: build => ({
        searchPoints: build.query<IPoint[], void>({
            query: () => ({
                url: '/point'
            }),
            providesTags: ['Points']
        }),
        createPoint: build.mutation<IPoint, IPoint>({
            query(body) {
                return {
                    url: `/point`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{type: 'Points'}],
        })
    })
});


export const {useCreatePointMutation, useSearchPointsQuery} = pointApi;