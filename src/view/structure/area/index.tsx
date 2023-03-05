import {AreaStructureTypeCreateRequest, IAreaStructureType} from "./types";
import React, {useState} from "react";
import {Button, Col, Form, Modal, Row, Tree, TreeDataNode} from "antd";
import {
    useCreateAreaStructureMutation,
    useSearchAreasQuery,
    useSearchAreaStructureQuery
} from "../../../api/areaStructure";
import {PlusOutlined} from "@ant-design/icons";
import AreaStructureTypeForm from "./types/AreaStructureTypeForm";
import {AreaStructureForm} from "./AreaStructureForm";
import {useSearchAreaStructureTypeQuery} from "../../../api/areaStructureType";

export interface IAreaStructure {
    id: number;
    name: string;
    description: string;
    parent?: IAreaStructure;
    children: IAreaStructure[];
    areaStructureType: IAreaStructureType;
}

export interface TreeAreaStructure extends TreeDataNode {
    description: string;
    parent?: IAreaStructure;
    areaStructureType: IAreaStructureType;
}

export interface AreaStructureCreateRequest {
    name: string;
    description: string;
    areaStructureTypeId?: number;
    parentId?: number;
}

export interface AreaStructureLinkRequest {
    childId: number;
    parentId: number;
}

export interface IArea {
    id: number;
    name: string;
    description: string;
    areaStructureType: IAreaStructureType;
}


const AreaStructurePage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const {data, isLoading} = useSearchAreaStructureQuery()
    const [createAreaStructure] = useCreateAreaStructureMutation();
    const areas = useSearchAreasQuery();
    const areaStructureTypes = useSearchAreaStructureTypeQuery()

    const [form] = Form.useForm();
    const showModal = () => {
        setShowAddModal(true);
    }

    const handleCancel = () => {
        setShowAddModal(false);
    }

    const handleOk = (areaStructure: AreaStructureCreateRequest) => {
        console.log(areaStructure)
        createAreaStructure(areaStructure);
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
            <Col flex={3}><Button type="primary" shape="round" icon={<PlusOutlined/>} size={'large'}
                                  onClick={showModal}
                                  style={{position: 'relative', float: 'right', marginBottom: '20px', marginTop: '20px'}}/></Col>
        </Row>


        <Modal title="Add total station" open={showAddModal} onOk={form.submit} onCancel={handleCancel}>
            <AreaStructureForm onFinish={handleOk} form={form} areas={areas.data ? areas.data : []} areaStructureTypes={areaStructureTypes.data ? areaStructureTypes.data : []}/>
        </Modal>
    </div>
}

export default AreaStructurePage;