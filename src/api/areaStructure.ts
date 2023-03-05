import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    AreaStructureCreateRequest,
    AreaStructureLinkRequest,
    IArea,
    IAreaStructure,
    TreeAreaStructure
} from "../view/structure/area";
import {toTreeNode} from "./trenode";

export const areaStructureApi = createApi({
    reducerPath: 'easyPoint/areaStructure',
    refetchOnFocus: true,
    tagTypes: ['AREA_STRUCTURE'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/area-structure',
        credentials: 'include'
    }),
    endpoints: build => ({
        searchAreaStructure: build.query<TreeAreaStructure[], void>({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            transformResponse: (response: IAreaStructure[]): TreeAreaStructure[] => {
                return response.map(it => toTreeNode(it))
            },
            providesTags: ['AREA_STRUCTURE']
        }),
        searchAreas: build.query<IArea[], void>({
            query: () => ({
                url: '/areas',
                method: 'GET'
            }),
            providesTags: ['AREA_STRUCTURE']
        }),
        createAreaStructure: build.mutation<void, AreaStructureCreateRequest>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['AREA_STRUCTURE']
        }),
        linkAreaStructure: build.mutation<void, AreaStructureLinkRequest>({
            query: (body) => ({
                url: '/link',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['AREA_STRUCTURE']
        }),
    })
})

export const {
    useSearchAreaStructureQuery,
    useSearchAreasQuery,
    useCreateAreaStructureMutation,
    useLinkAreaStructureMutation
} = areaStructureApi