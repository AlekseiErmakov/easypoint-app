import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AreaStructureTypeCreateRequest, IAreaStructureType} from "../view/structure/area/types";

export const areaStructureTypeApi = createApi({
    reducerPath: 'easyPoint/areaStructureType',
    refetchOnFocus: true,
    tagTypes: ['AREA_STRUCTURE_TYPE'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/area-structure-type',
        credentials: 'include'
    }),
    endpoints: build => ({
        searchAreaStructureType: build.query<IAreaStructureType[], void>({
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
                body: body
            }),
            invalidatesTags: ['AREA_STRUCTURE_TYPE']
        })
    })
});

export const {useSearchAreaStructureTypeQuery, useCreateAreaStructureTypeMutation} = areaStructureTypeApi;