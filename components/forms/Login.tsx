import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const LoginForm = () => {
    const [form] = Form.useForm()

    const handleSumbit = () => {
        console.log("Logging in")
    }

    return (
        <Form
            name="login"
            layout="vertical"
            form={form}
            onFinish={handleSumbit}
            size="large"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password" }]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    )
}

export default LoginForm
