import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {ITotalStation, TotalStationCreateRequest} from "../view/tool/totalStation";

export const totalStationApi = createApi({
    reducerPath: 'easyPoint/tool/totalStation',
    baseQuery: fetchBaseQuery({
        credentials: "include",
        baseUrl: '/tool/total-station'
    }),
    tagTypes: ['TOTAL_STATION'],
    refetchOnFocus: true,
    endpoints: build => ({
        searchTotalStations: build.query<ITotalStation[], void>({
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
                    body: body
                }
            },
            invalidatesTags: ['TOTAL_STATION']
        })
    })
});

export const {useSearchTotalStationsQuery, useCreateTotalStationMutation} = totalStationApi;