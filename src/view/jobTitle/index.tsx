import React, {useState} from 'react'

import {
    useCreateJobTitleMutation,
    useDeleteJobTitleMutation,
    useSearchJobTitlesQuery,
    useUpdateJobTitleMutation
} from '../../api/jobTitle'
import DictionaryPage from "../../jobTitle";
import {type} from "os";

export interface JobTitle {
    id: number
    name: string
    description: string
}

export interface JobTitleCreateRequest {
    name: string
    description: string
}

export interface JobTitleUpdateRequest {
    id: number
    name?: string
    description?: string
}

const JobTitlePage = (): JSX.Element => {
    return <DictionaryPage createDictionary={useCreateJobTitleMutation}
                           deleteDictionary={useDeleteJobTitleMutation}
                           updateDictionary={useUpdateJobTitleMutation}
                           dictionaryQuery={useSearchJobTitlesQuery}
                            dType="JobTitle"
                           dictionaryName="Job Title"
    />
}

export default JobTitlePage
