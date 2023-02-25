import {FormInstance} from "antd/es/form/hooks/useForm";
import {IPoint} from "./index";
import {Form, Input} from "antd";
import React from "react";

interface PointFormProps {
    onFinish: (point: IPoint) => void;
    form: FormInstance;
}

const PointForm = (props: PointFormProps) => {

    return (
        <div>
            <Form
                form={props.form}
                name="basic"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                initialValues={{remember: true}}
                onFinish={props.onFinish}
                autoComplete="off"
            >
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
