import React, { useState } from 'react'
import { Form, Modal } from 'antd'
import EpButton from '../../components/Button'
import { PlusOutlined } from '@ant-design/icons'
import JobTitleForm, { type JobTitleFormResult } from './JobTitleForm'
import JobTitleTable from './JobTitleTable'
import {
  useCreateJobTitleMutation,
  useDeleteJobTitleMutation,
  useSearchJobTitlesQuery,
  useUpdateJobTitleMutation
} from '../../api/jobTitle'

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
  const { data } = useSearchJobTitlesQuery()
  const [showAddModal, setShowAddModal] = useState(false)
  const [updatedJobTitle, setUpdatedJobTitle] = useState<undefined | JobTitle>(undefined)
  const [deletedJobTitle, setDeletedJobTitle] = useState<undefined | JobTitle>(undefined)
  const [addJobTitle] = useCreateJobTitleMutation()
  const [updateJobTitle] = useUpdateJobTitleMutation()
  const [deleteJobTitle] = useDeleteJobTitleMutation()
  const [form] = Form.useForm()
  const showModal = (): void => {
    setShowAddModal(true)
  }

  const showUpdateModal = (jobTitle: JobTitle): void => {
    setUpdatedJobTitle(jobTitle)
  }

  const showDeleteModal = (jobTitle: JobTitle): void => {
    setDeletedJobTitle(jobTitle)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleDeleteCancel = (): void => {
    setDeletedJobTitle(undefined)
  }

  const handleUpdateCancel = (): void => {
    setUpdatedJobTitle(undefined)
  }

  const handleDelete = (): void => {
    if (deletedJobTitle !== undefined) {
      void deleteJobTitle(deletedJobTitle.id)
      setDeletedJobTitle(undefined)
    }
  }
  const handleUpdate = (jobTitle: JobTitleFormResult): void => {
    if (updatedJobTitle !== undefined) {
      void updateJobTitle({ ...jobTitle, ...{ id: updatedJobTitle.id } })
      form.resetFields()
      setUpdatedJobTitle(undefined)
    }
  }

  const handleOk = (request: JobTitleFormResult): void => {
    void addJobTitle(request)
    form.resetFields()
    setShowAddModal(false)
  }

  return <>
    <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
    <JobTitleTable jobTitles={(data != null) ? data : []} showUpdateModal={showUpdateModal} showDeleteModal={showDeleteModal}/>
    <Modal title="Add job title" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
      <JobTitleForm onFinish={handleOk} form={form}/>
    </Modal>
    <Modal title="Delete job title" open={deletedJobTitle !== undefined} onOk={handleDelete}
           onCancel={handleDeleteCancel}>
      <div>Are you sure you want to delete job title {deletedJobTitle?.name} ?</div>
    </Modal>
    <Modal title="Update job title" open={updatedJobTitle !== undefined} onOk={form.submit} onCancel={handleUpdateCancel}
           width={500}>
      <JobTitleForm onFinish={handleUpdate} jobTitle={updatedJobTitle} form={form}/>
    </Modal>
  </>
}

export default JobTitlePage
