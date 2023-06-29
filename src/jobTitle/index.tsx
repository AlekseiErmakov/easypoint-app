import React, {FunctionComponent, useState} from 'react'
import {Form, Modal} from 'antd'

import DictionaryTable from './DictionaryTable'
import {
    useCreateJobTitleMutation,
    useDeleteJobTitleMutation,
    useSearchJobTitlesQuery,
    useUpdateJobTitleMutation
} from '../api/jobTitle'
import {MutationTrigger, UseMutation, UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition, QueryDefinition
} from "@reduxjs/toolkit/query";
import {JobTitleCreateRequest} from "../view/jobTitle";
import DictionaryCreateForm from "./DictionaryCreateForm";
import {PlusOutlined} from "@ant-design/icons";
import EpButton from "../components/Button";
import DictionaryUpdateForm from "./DictionaryUpdateForm";

export interface Dictionary {
    id: number
    name: string
    description: string
}

export interface DictionaryCreateRequest {
    name: string
    description?: string
    '@type'?: string
}

export interface DictionaryUpdateRequest {
    id: number
    name?: string
    description?: string
}


export interface DictionaryPageProps<T extends Dictionary, C extends DictionaryCreateRequest, U extends DictionaryUpdateRequest> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    dictionaryQuery: UseQuery<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, any, T[], any>>
    // eslint-disable-next-line @typescript-eslint/ban-types
    createDictionary: UseMutation<MutationDefinition<C, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, any, void, any>>
    // eslint-disable-next-line @typescript-eslint/ban-types
    updateDictionary: UseMutation<MutationDefinition<U, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, any, void, any>>
    // eslint-disable-next-line @typescript-eslint/ban-types
    deleteDictionary: UseMutation<MutationDefinition<number, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, any, void, any>>
    dType: string
    dictionaryName: string
}

function DictionaryPage<T extends Dictionary, C extends DictionaryCreateRequest, U extends DictionaryUpdateRequest> (props: DictionaryPageProps<T, C, U>) {
    const {data, isLoading, isError, isSuccess} = props.dictionaryQuery()
    const [showAddModal, setShowAddModal] = useState(false)
    const [updatedDictionary, setUpdatedDictionary] = useState<undefined | T>(undefined)
    const [deletedDictionary, setDeletedDictionary] = useState<undefined | T>(undefined)
    const [addDictionary] = props.createDictionary()
    const [updateDictionary] = props.updateDictionary()
    const [deleteDictionary] = props.deleteDictionary()
    const [form] = Form.useForm()
    const showModal = (): void => {
        setShowAddModal(true)
    }

    const showUpdateModal = (dictionary: T): void => {
        setUpdatedDictionary(dictionary)
    }

    const showDeleteModal = (dictionary: T): void => {
        setDeletedDictionary(dictionary)
    }

    const handleCancel = (): void => {
        setShowAddModal(false)
    }

    const handleDeleteCancel = (): void => {
        setDeletedDictionary(undefined)
    }

    const handleUpdateCancel = (): void => {
        setUpdatedDictionary(undefined)
    }

    const handleDelete = (): void => {
        if (deletedDictionary !== undefined) {
            void deleteDictionary(deletedDictionary.id)
            setDeletedDictionary(undefined)
        }
    }
    const handleUpdate = (request: U): void => {
        if (updatedDictionary !== undefined) {
            void updateDictionary({...request, ...{id: updatedDictionary.id, dType: props.dType}})
            form.resetFields()
            setUpdatedDictionary(undefined)
        }
    }

    const handleSave = (request: C): void => {
        void addDictionary({...request, ...{dType: props.dType }} )
        form.resetFields()
        setShowAddModal(false)
    }

    return <>
        <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
        <DictionaryTable dictionaries={(data != undefined) ? data : []} showUpdateModal={showUpdateModal}
                         showDeleteModal={showDeleteModal}/>
        <Modal title={`Add ${props.dType}`} open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
            <DictionaryCreateForm onFinish={handleSave} form={form}/>
        </Modal>
        <Modal title={`Delete ${props.dType}`} open={deletedDictionary !== undefined} onOk={handleDelete}
               onCancel={handleDeleteCancel}>
            <div>Are you sure you want to delete {props.dictionaryName} {deletedDictionary?.name} ?</div>
        </Modal>
        <Modal title={`Update ${props.dType}`} open={updatedDictionary !== undefined} onOk={form.submit}
               onCancel={handleUpdateCancel}
               width={500}>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <DictionaryUpdateForm onFinish={handleUpdate} dictionary={updatedDictionary!} form={form} dictionaryName={props.dictionaryName}/>
        </Modal>
    </>
}

export default DictionaryPage
