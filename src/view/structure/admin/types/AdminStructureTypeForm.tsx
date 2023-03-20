import {FormInstance} from "antd/es/form/hooks/useForm";
import {AreaStructureTypeCreateRequest} from "../../area/types";
import {Form, Input} from "antd";
import React from "react";
import {AdminStructureTypeCreateRequest} from "./index";

interface AdminStructureTypeProps {
    form: FormInstance;

    onFinish: (areaStructure: AdminStructureTypeCreateRequest) => void;
}

const AdminStructureTypeForm = (props: AdminStructureTypeProps) => {
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
                rules={[{required: true, message: 'Please input admin structure type name!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{required: true, message: 'Please input admin structure type description!'}]}
            >
                <Input/>
            </Form.Item>
        </Form>
    </>
}

export default AdminStructureTypeForm;