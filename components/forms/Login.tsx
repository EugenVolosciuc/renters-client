import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'

import { useLoginMutation } from 'store/auth/service'
import { LoginData } from 'types/User'
import { handleError } from 'utils/handleError'
import { redirectUserBasedOnRole } from 'utils/userRedirects'
import { useAppDispatch } from 'store'
import { setUser } from 'store/auth/slice'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'

const LoginForm = () => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [loginUser, { isLoading }] = useLoginMutation()
    const [redirecting, setRedirecting] = useState(false)
    useAuthRedirect(false)

    const handleSubmit = async (values: LoginData) => {
        try {
            const user = await loginUser(values).unwrap()
            dispatch(setUser({ user }))
            message.success(`Hi there, ${user.firstName}`)

            setRedirecting(true)
            redirectUserBasedOnRole(user)
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <Form
            name="login"
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            size="large"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email" }]}
            >
                <Input autoComplete="username" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password" }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading || redirecting}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
