import React from 'react'
import {
    useCreateAdminStructureTypeMutation,
    useDeleteAdminStructureTypeMutation,
    useSearchAdminStructureTypeQuery,
    useUpdateAdminStructureTypeMutation
} from '../../../../api/adminStructureType'
import DictionaryPage from "../../../../jobTitle";

export interface AdministrativeUnitType {
    id: number
    name: string
    description: string
}

export interface AdministrativeUnitTypeCreateRequest {
    name: string
    description: string
}

export interface AdministrativeUnitTypeUpdateRequest {
    id: number
    name?: string
    description?: string
}

const AdminStructureTypePage = (): JSX.Element => {
    return <DictionaryPage createDictionary={useCreateAdminStructureTypeMutation}
                           deleteDictionary={useDeleteAdminStructureTypeMutation}
                           updateDictionary={useUpdateAdminStructureTypeMutation}
                           dictionaryQuery={useSearchAdminStructureTypeQuery}
                           dType="AdministrativeUnitType"
                           dictionaryName="Admin Unit Type"
    />
}

export default AdminStructureTypePage
