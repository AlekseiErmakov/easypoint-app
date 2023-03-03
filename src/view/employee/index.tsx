import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import {useCreateEmployeeMutation, useSearchEmployeesQuery} from "../../api/employee";
import EmployeeTable from "./EmployeeTable";
import {UserAddOutlined} from "@ant-design/icons";
import EmployeeForm from "./EmployeeForm";


export interface IEmployee {
    id: number;
    firstname: string;
    surname: string;
    lastname: string;
    created?: Date;
    updated?: Date;
}


const EmployeePage = () => {
    const {data, isLoading} = useSearchEmployeesQuery();
    const [addEmployee] = useCreateEmployeeMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (employee: IEmployee) => {
        console.log(employee);
        addEmployee(employee);
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <div>
        <Button type="primary" shape="round" icon={<UserAddOutlined/>} size={'large'}
                onClick={showModal}
                style={{position: 'relative', float: 'right' , marginBottom: '20px'}}/>
        {isLoading ? <h1>Loading</h1> : <EmployeeTable employees={data ? data : []}/>}
        <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
            <EmployeeForm onFinish={handleOk} form={form}/>
        </Modal>
    </div>
}

export default EmployeePage;