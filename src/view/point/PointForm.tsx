import {FormInstance} from "antd/es/form/hooks/useForm";
import {IPoint, IPointCreateRequest, IPointType} from "./index";
import {Form, Input, Select} from "antd";
import React, {useState} from "react";

interface PointFormProps {
    onFinish: (point: IPointCreateRequest) => void;
    form: FormInstance;
    pointTypes: IPointType[]
}

const PointForm = (props: PointFormProps) => {
    const form = props.form;
    const[pointType, setPointType] = useState(0)
    const handlePointTypeChange = (value: number) => {
        setPointType(value);
    }
    const onFinish = (value: IPointCreateRequest) => {
        props.onFinish({...value, ...{pointTypeId: pointType}});
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <span>Point type:</span>
                <Select
                    defaultValue={props.pointTypes ? props.pointTypes[0]?.id : 1}
                    style={{ width: 390, marginLeft: "10px", marginBottom: '20px' }}
                    onChange={handlePointTypeChange}
                    options={props.pointTypes.map(it => ({label: it.name, value: it.id}))}
                />
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
        </div>
    )
}

export default PointForm;
