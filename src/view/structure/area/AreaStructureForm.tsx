import {FormInstance} from "antd/es/form/hooks/useForm";
import {IAreaStructureType} from "./types";
import {AreaStructureCreateRequest, IArea} from "./index";
import {Form, Input, Select} from "antd";
import React, {useState} from "react";
import {IPointCreateRequest} from "../../point";

interface AreaStructureTypeProps {
    form: FormInstance;

    areas: IArea[];
    areaStructureTypes: IAreaStructureType[];

    onFinish: (areaStructure: AreaStructureCreateRequest) => void;
}


export const AreaStructureForm = (props: AreaStructureTypeProps) => {
    const [areaStructureType, setAreaStructureType] = useState<number | undefined>(undefined);
    const [parent, setParent] = useState<number | undefined>(undefined);
    const handleAreaStructureTypeChange = (type: number) => {
        setAreaStructureType(type);
    }
    const handleParentIdChange = (parentId: number) => {
        setParent(parentId);
    }
    const onFinish = (value: AreaStructureCreateRequest) => {
        props.onFinish({...value, ...{parentId: parent, areaStructureTypeId: areaStructureType}});
    }
    return <>
        <Form
            form={props.form}
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
        >
            <span>Area type: </span>
            <Select
                defaultValue={undefined}
                style={{width: 390, marginLeft: "10px", marginBottom: '20px'}}
                onChange={handleAreaStructureTypeChange}
                options={props.areaStructureTypes.map(it => ({label: it.name, value: it.id}))}
            />
            <span>Area: </span>
            <Select
                defaultValue={undefined}
                style={{width: 390, marginLeft: "10px", marginBottom: '20px'}}
                onChange={handleParentIdChange}
                options={props.areas.map(it => ({label: it.name, value: it.id}))}
            />
            <Form.Item
                label="Name"
                name="name"
                rules={[{required: true, message: 'Please input area structure type name!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{required: true, message: 'Please input area structure type description!'}]}
            >
                <Input/>
            </Form.Item>
        </Form>
    </>
}