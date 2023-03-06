import {FormInstance} from "antd/es/form/hooks/useForm";
import {AreaStructureTypeCreateRequest} from "./index";
import {Form, Input, Select} from "antd";
import React from "react";


interface AreaStructureTypeProps {
    form: FormInstance;

    onFinish: (areaStructure: AreaStructureTypeCreateRequest) => void;
}

const AreaStructureTypeForm = (props: AreaStructureTypeProps) => {
    return <>
        <Form
            form={props.form}
            name="basic"
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            initialValues={{remember: true}}
            onFinish={props.onFinish}
            autoComplete="off"
        >
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

export default AreaStructureTypeForm;
