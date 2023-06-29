import React from 'react'
import {
    useCreateAreaStructureTypeMutation,
    useDeleteAreaStructureTypeMutation,
    useSearchAreaStructureTypeQuery,
    useUpdateAreaStructureTypeMutation
} from '../../../../api/areaStructureType'
import DictionaryPage from "../../../../jobTitle";

export interface AreaStructureType {
    id: number
    name: string
    description: string
}

export interface AreaStructureTypeCreateRequest {
    name: string
    description: string
}

export interface AreaStructureTypeUpdateRequest {
    id: number
    name?: string
    description?: string
}

const AreaStructureTypePage = (): JSX.Element => {
    return <DictionaryPage createDictionary={useCreateAreaStructureTypeMutation}
                           deleteDictionary={useDeleteAreaStructureTypeMutation}
                           updateDictionary={useUpdateAreaStructureTypeMutation}
                           dictionaryQuery={useSearchAreaStructureTypeQuery}
                           dType="AreaStructureType"
                           dictionaryName="Area Structure Type"
    />
}

export default AreaStructureTypePage
