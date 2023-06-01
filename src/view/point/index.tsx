import React, { useState } from 'react'
import { Button, Form, Modal, Upload } from 'antd'
import { CloudDownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { type Employee } from '../employee'
import {
  useCreatePointMutation,
  useDeletePointMutation,
  useSavePointCsvMutation,
  useSearchPointsQuery,
  useSearchPointTypesQuery,
  useUpdatePointMutation
} from '../../api/point'
import PointTable from './PointTable'
import PointForm, { type PointFormResult } from './PointForm'
import { useSearchAreaStructureQuery } from '../../api/areaStructure'
import { type Area } from '../structure/area'
import EpButton from '../../components/Button'
import { downLoadFile } from '../../api/download'
import { jsx } from '@emotion/react'
import JSX = jsx.JSX

export enum PointTypes {
  REFERENCE_POINT, WALL_MARK, FIXED_POINT
}

export enum PointStates {
  CREATED = 'CREATED',
  LOST = 'LOST',
  UPDATE_REQUIRED = 'UPDATE_REQUIRED',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  READY_TO_USE = 'READY_TO_USE'
}

export interface PointType {
  id: number
  code: PointTypes
  name: string
  description: string
}

export interface PointState {
  id: number
  code: PointStates
  name: string
  description: string
}

export interface Point {
  id: number
  name: string
  x: number
  y: number
  h: number
  rootAreaId?: number
  areas: Area[]
  pointType: PointType
  pointState: PointState
  created?: Date
  updated?: Date
  creator: Employee
}

export interface PointCreateRequest {
  name: string
  x: number
  y: number
  h: number
  pointTypeId: number
  pointAreaId: number
}

export interface PointUpdateRequest {
  id: number
  name: string
  x: number
  y: number
  h: number
  pointTypeId: number
  pointAreaId: number
}

const PointPage = (): JSX.Element => {
  const { data, isLoading } = useSearchPointsQuery()
  const pointTypes = useSearchPointTypesQuery()
  const areas = useSearchAreaStructureQuery()
  const [addPoint] = useCreatePointMutation()
  const [updatePoint] = useUpdatePointMutation()
  const [deletePoint] = useDeletePointMutation()
  const [savePoints] = useSavePointCsvMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updatedPoint, setUpdatedPoint] = useState<Point | undefined>(undefined)
  const [pointForDelete, setPointForDelete] = useState<Point | undefined>(undefined)
  const [form] = Form.useForm()

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const downLoadPoints = (): void => {
    downLoadFile({ url: '/points/csv' })
  }

  const showDeleteModal = (point: Point): void => {
    setPointForDelete(point)
  }

  const showUpdateModal = (point: Point): void => {
    setUpdatedPoint(point)
  }

  const handleSave = (point: PointFormResult): void => {
    console.log(point)
    void addPoint({ ...point })
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleUpdate = (point: PointFormResult): void => {
    void updatePoint({ ...point, ...{ id: updatedPoint!.id } })
    form.resetFields()
    setUpdatedPoint(undefined)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const handleUpdateCancel = (): void => {
    setUpdatedPoint(undefined)
  }

  const handleDeleteCancel = (): void => {
    setPointForDelete(undefined)
  }

  const handleDelete = (): void => {
    if (pointForDelete != undefined) {
      void deletePoint(pointForDelete.id)
    }
    setPointForDelete(undefined)
  }

  const uploadPointsInCsv = (options: any): void => {
    const { onSuccess, onError, file } = options
    const fmData = new FormData()
    fmData.append('file', file)
    void savePoints(fmData)
  }

  return <div>
    <Upload customRequest={uploadPointsInCsv}>
      <Button icon={<UploadOutlined/>}>Click to Upload</Button>
    </Upload>
    <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
    <EpButton icon={<CloudDownloadOutlined/>} onClick={downLoadPoints}/>
    {isLoading
      ? <h1>Loading</h1>
      : <PointTable points={(data != null) ? data : []} showDeleteModal={showDeleteModal}
                    showUpdateModel={showUpdateModal}/>}
    <Modal title="Add point" open={isModalOpen} onOk={form.submit} onCancel={handleCancel} width={500}>
      <PointForm onFinish={handleSave} form={form} pointTypes={(pointTypes.data != null) ? pointTypes.data : []}
                 areaStructure={(areas.data != null) ? areas.data : []}/>
    </Modal>
    <Modal title="Delete Point" open={pointForDelete !== undefined} onOk={handleDelete}
           onCancel={handleDeleteCancel}>
      <div>Are you sure you want to delete point {pointForDelete?.name} ?</div>
    </Modal>
    <Modal title="Update point" open={updatedPoint !== undefined} onOk={form.submit} onCancel={handleUpdateCancel}
           width={500}>
      <PointForm onFinish={handleUpdate} point={updatedPoint} form={form}
                 pointTypes={(pointTypes.data != null) ? pointTypes.data : []}
                 areaStructure={(areas.data != null) ? areas.data : []}/>
    </Modal>
  </div>
}

export default PointPage
