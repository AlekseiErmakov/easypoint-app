import {useCreateTotalStationMutation} from "../../../../api/totalStation";
import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import TotalStationTable from "../../../tool/totalStation/TotalStationTable";
import TotalStationForm from "../../../tool/totalStation/TotalStationForm";
import {TotalStationCreateRequest} from "../../../tool/totalStation";
import {useSearchAreaStructureQuery} from "../../../../api/areaStructure";
import {useCreateAreaStructureTypeMutation, useSearchAreaStructureTypeQuery} from "../../../../api/areaStructureType";
import AreaStructureTypeTable from "./AreaStructureTypeTable";
import AreaStructureTypeForm from "./AreaStructureTypeForm";
import EpButton from "../../../../components/Button";

export interface IAreaStructureType {
    id: number;
    name: string;
    description: string;
}

export interface AreaStructureTypeCreateRequest {
    name: string;
    description: string;
}

const AreaStructureTypePage = () => {
    const {data, isLoading} = useSearchAreaStructureTypeQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [addAreaStructureType] = useCreateAreaStructureTypeMutation()
    const [form] = Form.useForm();
    const showModal = () => {
        setShowAddModal(true);
    }

    const handleCancel = () => {
        setShowAddModal(false);
    }

    const handleOk = (areaStructureType: AreaStructureTypeCreateRequest) => {
        addAreaStructureType(areaStructureType);
        form.resetFields();
        setShowAddModal(false);
    }

    return <>
        <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
        <AreaStructureTypeTable areaStructureTypes={data ? data : []}/>
        <Modal title="Add total station" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
            <AreaStructureTypeForm onFinish={handleOk} form={form}/>
        </Modal>
    </>
}


export default AreaStructureTypePage;