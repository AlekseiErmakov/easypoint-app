import {useCreateTotalStationMutation, useSearchTotalStationsQuery} from "../../../api/totalStation";
import TotalStationTable from "./TotalStationTable";
import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Form, Modal} from "antd";
import TotalStationForm from "./TotalStationForm";

export interface ITotalStation {
    id: number;
    firm: string;
    model: string;
    serialNumber: string;
}

export interface TotalStationCreateRequest {
    firm: string;
    model: string;
    serialNumber: string;
}

const TotalStationPage = () => {
    const {data, isLoading} = useSearchTotalStationsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [addTotalStation] = useCreateTotalStationMutation()
    const [form] = Form.useForm();
    const showModal = () => {
        setShowAddModal(true);
    }

    const handleCancel = () => {
        setShowAddModal(false);
    }

    const handleOk = (point: TotalStationCreateRequest) => {
        addTotalStation(point);
        form.resetFields();
        setShowAddModal(false);
    }

    return <>
        <Button type="primary" shape="round" icon={<PlusOutlined/>} size={'large'}
                onClick={showModal}
                style={{position: 'relative', float: 'right', marginBottom: '20px', marginTop: '20px'}}/>
        <TotalStationTable totalStations={data ? data : []}/>
        <Modal title="Add total station" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
            <TotalStationForm onFinish={handleOk} form={form}/>
        </Modal>
    </>
}

export default TotalStationPage;