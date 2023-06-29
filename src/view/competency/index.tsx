import React from 'react'
import {
    useCreateCompetencyMutation,
    useDeleteCompetencyMutation,
    useSearchCompetenciesQuery,
    useUpdateCompetencyMutation
} from '../../api/competency'
import DictionaryPage from "../../jobTitle";

export interface Competency {
    id: number
    name: string
    description: string
}

export interface CompetencyCreateRequest {
    name: string
    description: string
}

export interface CompetencyUpdateRequest {
    id: number
    name?: string
    description?: string
}

const CompetencyPage = (): JSX.Element => {
    return <DictionaryPage createDictionary={useCreateCompetencyMutation}
                           deleteDictionary={useDeleteCompetencyMutation}
                           updateDictionary={useUpdateCompetencyMutation}
                           dictionaryQuery={useSearchCompetenciesQuery}
                           dType="Competency"
                           dictionaryName="Competency"
    />
}

export default CompetencyPage
