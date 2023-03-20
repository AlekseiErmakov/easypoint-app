import {IAreaStructureType} from "../area/types";
import {Col, Form, Modal, Row, Tree, TreeDataNode} from "antd";
import {IAdminStructureType} from "./types";
import React, {useState} from "react";
import {
    useCreateAreaStructureMutation,
    useSearchAreasQuery,
    useSearchAreaStructureQuery
} from "../../../api/areaStructure";
import {useSearchAreaStructureTypeQuery} from "../../../api/areaStructureType";
import EpButton from "../../../components/Button";
import {PlusOutlined} from "@ant-design/icons";
import {AreaStructureForm} from "../area/AreaStructureForm";
import {AreaStructureCreateRequest} from "../area";
import {
    useCreateAdminStructureMutation,
    useSearchAdminsQuery,
    useSearchAdminStructureQuery
} from "../../../api/adminStructure";
import {useSearchAdminStructureTypeQuery} from "../../../api/adminStructureType";
import {AdminStructureForm} from "./AdminStructureForm";

export interface IAdminStructure {
    id: number;
    name: string;
    description: string;
    parent?: IAdminStructure;
    children: IAdminStructure[];
    areaStructureType: IAdminStructureType;
}

export interface TreeAdminStructure extends TreeDataNode {
    value: number;
    description: string;
    label: string;
    parent?: IAdminStructure;
    areaStructureType: IAdminStructureType;
}

export interface AdminStructureCreateRequest {
    name: string;
    description: string;
    areaStructureTypeId?: number;
    parentId?: number;
}


export interface IAdmin {
    id: number;
    name: string;
    description: string;
    areaStructureType: IAdminStructureType;
}


const AdminStructurePage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const {data, isLoading} = useSearchAdminStructureQuery()
    const [createAdminStructure] = useCreateAdminStructureMutation();
    const admins = useSearchAdminsQuery();
    const adminStructureTypes = useSearchAdminStructureTypeQuery()

    const [form] = Form.useForm();
    const showModal = () => {
        setShowAddModal(true);
    }

    const handleCancel = () => {
        setShowAddModal(false);
    }

    const handleOk = (adminStructure: AdminStructureCreateRequest) => {
        console.log(adminStructure)
        createAdminStructure(adminStructure);
        form.resetFields();
        setShowAddModal(false);
    }
    return <div>
        <Row>
            <Col flex={2}><Tree
                className="draggable-tree"
                treeData={data}
                draggable
                blockNode
            /></Col>
            <Col flex={3}><EpButton onClick={showModal} icon={<PlusOutlined/>}/></Col>
        </Row>
        <Modal title="Add admin" open={showAddModal} onOk={form.submit} onCancel={handleCancel} width={500}>
            <AdminStructureForm onFinish={handleOk} form={form} areas={admins.data ? admins.data : []} adminStructureTypes={adminStructureTypes.data ? adminStructureTypes.data : []}/>
        </Modal>
    </div>
}

export default AdminStructurePage;