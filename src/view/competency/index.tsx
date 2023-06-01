import React, { useState } from 'react'
import { Form, Modal } from 'antd'
import EpButton from '../../components/Button'
import { PlusOutlined } from '@ant-design/icons'
import {
  useCreateCompetencyMutation,
  useDeleteCompetencyMutation,
  useSearchCompetenciesQuery, useUpdateCompetencyMutation
} from '../../api/competency'
import CompetencyTable from './CompetencyTable'
import CompetencyForm, { type CompetencyFormResult } from './CompetencyForm'
import JobTitleForm from '../jobTitle/JobTitleForm'

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
  const { data } = useSearchCompetenciesQuery()
  const [showAddModal, setShowAddModal] = useState(false)
  const [updatedCompetency, setUpdatedCompetency] = useState<undefined | Competency>(undefined)
  const [deletedCompetency, setDeletedCompetency] = useState<undefined | Competency>(undefined)
  const [addCompetency] = useCreateCompetencyMutation()
  const [updateCompetency] = useUpdateCompetencyMutation()
  const [deleteCompetency] = useDeleteCompetencyMutation()
  const [form] = Form.useForm()

  const showModal = (): void => {
    setShowAddModal(true)
  }

  const showUpdateModal = (competency: Competency): void => {
    setUpdatedCompetency(competency)
  }

  const showDeleteModal = (competency: Competency): void => {
    setDeletedCompetency(competency)
  }

  const handleCancel = (): void => {
    setShowAddModal(false)
  }

  const handleDeleteCancel = (): void => {
    setDeletedCompetency(undefined)
  }

  const handleUpdateCancel = (): void => {
    setUpdatedCompetency(undefined)
  }

  const handleOk = (request: CompetencyFormResult): void => {
    void addCompetency(request)
    form.resetFields()
    setShowAddModal(false)
  }

  const handleDelete = (): void => {
    if (deletedCompetency !== undefined) {
      void deleteCompetency(deletedCompetency.id)
      setDeletedCompetency(undefined)
    }
  }

  const handleUpdate = (competencyFormResult: CompetencyFormResult): void => {
    if (updatedCompetency !== undefined) {
      void updateCompetency({ ...competencyFormResult, ...{ id: updatedCompetency.id } })
      form.resetFields()
      setUpdatedCompetency(undefined)
    }
  }

  return <>
    <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
    <CompetencyTable competencies={(data != null) ? data : []} showDeleteModal={showDeleteModal} showUpdateModal={showUpdateModal}/>
    <Modal title="Add competency" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
      <CompetencyForm onFinish={handleOk} form={form}/>
    </Modal>
    <Modal title="Delete competency" open={deletedCompetency !== undefined} onOk={handleDelete}
           onCancel={handleDeleteCancel}>
      <div>Are you sure you want to delete competency {deletedCompetency?.name} ?</div>
    </Modal>
    <Modal title="Update competency" open={updatedCompetency !== undefined} onOk={form.submit} onCancel={handleUpdateCancel}
           width={500}>
      <JobTitleForm onFinish={handleUpdate} jobTitle={updatedCompetency} form={form}/>
    </Modal>
  </>
}

export default CompetencyPage
