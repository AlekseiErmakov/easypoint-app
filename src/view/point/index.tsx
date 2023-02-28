import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IEmployee} from "../employee";
import {useCreatePointMutation, useSearchPointsQuery, useSearchPointTypesQuery} from "../../api/point";
import PointTable from "./PointTable";
import PointForm from "./PointForm";


export enum PointTypes {
    REFERENCE_POINT, WALL_MARK, FIXED_POINT
}

export enum PointStates {
    CREATED, LOST, UPDATE_REQUIRED, NOT_AVAILABLE, READY_TO_USE
}

export interface IPointType {
    id: number;
    code: PointTypes;
    name: string;
    description: string;
}

export interface IPointState {
    id: number;
    code: PointStates;
    name: string;
    description: string;
}

export interface IPoint {
    id: number;
    name: string;
    x: number;
    y: number;
    h: number;
    pointType: IPointType;
    pointState: IPointState;
    created?: Date;
    updated?: Date;
    creator: IEmployee;
}

export interface IPointCreateRequest {
    name: string;
    x: number;
    y: number;
    h: number;
    pointTypeId: number;
}

const PointPage = () => {
    const {data, isLoading} = useSearchPointsQuery();
    const pointTypes = useSearchPointTypesQuery();
    const [addPoint] = useCreatePointMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (point: IPointCreateRequest) => {
        console.log(point);
        addPoint(point);
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <div style={{padding: '50px'}}>
        <Button type="primary" shape="round" icon={<PlusOutlined/>} size={'large'}
                onClick={showModal}
                style={{position: 'relative', float: 'right', marginBottom: '20px'}}/>
        {isLoading ? <h1>Loading</h1> : <PointTable points={data ? data : []}/>}
        <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
            <PointForm onFinish={handleOk} form={form} pointTypes={pointTypes.data ? pointTypes.data : []}/>
        </Modal>
    </div>
}

export default PointPage