import {Form, Input} from "antd";
import React from "react";
import {IEmployee} from "./index";
import {FormInstance} from "antd/es/form/hooks/useForm";

interface EmployeeFormProps {
    onFinish: (employee: IEmployee) => void;
    form: FormInstance;
}

const EmployeeForm = (props: EmployeeFormProps) => {
    return (
        <div>
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
                    label="Firstname"
                    name="firstname"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Surname"
                    name="surname"
                    rules={[{required: true, message: 'Please input your surname!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Patronymic"
                    name="lastname"
                    rules={[{required: true, message: 'Please input your patronymic!'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </div>
    )
}


export default EmployeeForm;