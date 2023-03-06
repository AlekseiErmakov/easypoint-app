import {FormInstance} from "antd/es/form/hooks/useForm";
import {IPointCreateRequest, IPointType} from "./index";
import {Form, Input, Select, TreeSelect} from "antd";
import React, {useState} from "react";
import {IArea, IAreaStructure, TreeAreaStructure} from "../structure/area";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

interface PointFormProps {
    onFinish: (point: IPointCreateRequest) => void;
    form: FormInstance;
    areaStructure: TreeAreaStructure[];
    pointTypes: IPointType[]
}


const PointForm = (props: PointFormProps) => {
    return (
        <Form
            form={props.form}
            name="basic"
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            initialValues={{remember: true}}
            onFinish={props.onFinish}
            autoComplete="off"
        >
            <Form.Item name="pointTypeId" label="Point type" rules={[{ required: true }]} initialValue={undefined}>
                <Select
                    options={props.pointTypes.map(it => ({label: it.name, value: it.id}))}
                />
            </Form.Item>
            <Form.Item name="area" label="Area" rules={[{ required: true }]} initialValue={undefined}>
                <TreeSelect
                    showSearch
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    treeData={props.areaStructure}
                />
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[{required: true, message: 'Please input point name!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="X coordinate"
                name="x"
                rules={[{required: true, message: 'Please input x coordinate!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Y coordinate"
                name="y"
                rules={[{required: true, message: 'Please input y coordinate!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="H coordinate"
                name="h"
                rules={[{required: true, message: 'Please input h coordinate!'}]}
            >
                <Input/>
            </Form.Item>
        </Form>
    )
}

export default PointForm;
