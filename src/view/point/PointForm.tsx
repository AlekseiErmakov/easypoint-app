import {FormInstance} from "antd/es/form/hooks/useForm";
import {IPoint, IPointType} from "./index";
import {Form, Input, Select, TreeSelect} from "antd";
import React, {useEffect} from "react";
import {TreeAreaStructure} from "../structure/area";

interface PointFormProps {
    onFinish: (point: PointFormResult) => void;
    form: FormInstance;
    areaStructure: TreeAreaStructure[];
    pointTypes: IPointType[];
    point?: IPoint;
}

export interface PointFormResult {
    name: string;
    x: number;
    y: number;
    h: number;
    pointTypeId: number;
    pointAreaId: number;
}


const PointForm = (props: PointFormProps) => {
    const point = props.point;
    useEffect(() => {
        console.log(point)
        props.form.setFieldsValue({...point, ...{pointTypeId: point?.pointType?.id}, ...{pointAreaId: point?.rootAreaId}});
    }, [props.point]);
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
            <Form.Item name="pointTypeId" label="Point type" rules={[{required: true}]}>
                <Select
                    options={props.pointTypes.map(it => ({label: it.name, value: it.id}))}
                />
            </Form.Item>
            <Form.Item name="pointAreaId" label="Area" rules={[{required: true}]}>
                <TreeSelect
                    showSearch
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
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
