import {useCreateEmployeeMutation, useSearchEmployeesQuery} from "../../api/employee";
import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import {PlusOutlined, UserAddOutlined} from "@ant-design/icons";
import EmployeeTable from "../employee/EmployeeTable";
import EmployeeForm from "../employee/EmployeeForm";
import {IEmployee} from "../employee";
import {useCreatePointMutation, useSearchPointsQuery} from "../../api/point";
import PointTable from "./PointTable";
import PointForm from "./PointForm";

export interface IPoint {
    id?: number;
    name: string;
    x: number;
    y: number;
    h: number;
    created?: Date;
    updated?: Date;
    creator?: IEmployee;
}

const PointPage = () => {
    const {data, isLoading} = useSearchPointsQuery();
    const [addPoint] = useCreatePointMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    console.log(data)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (point: IPoint) => {
        console.log(point);
        addPoint(point);
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <div style={{padding: '50px'}}>
        <Button type="primary" shape="round" icon={<PlusOutlined />} size={'large'}
                onClick={showModal}
                style={{position: 'relative', float: 'right' , marginBottom: '20px'}}/>
        {isLoading ? <h1>Loading</h1> : <PointTable points={data ? data : []}/>}
        <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
            <PointForm onFinish={handleOk} form={form}/>
        </Modal>
    </div>
}

export default PointPage