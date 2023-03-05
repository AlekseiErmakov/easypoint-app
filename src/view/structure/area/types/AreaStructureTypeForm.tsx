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
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            initialValues={{remember: true}}
            onFinish={props.onFinish}
            autoComplete="off"
        >
            <span>Area structure type:</span>
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
