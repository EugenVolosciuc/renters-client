import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'next-i18next'

import { useLoginMutation } from 'store/auth/service'
import { LoginFormData } from 'types/User'
import { handleError } from 'utils/handleError'
import { redirectUserBasedOnRole } from 'utils/userRedirects'
import { useAppDispatch } from 'store'
import { setUser } from 'store/auth/slice'

const LoginForm = () => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const [loginUser, { isLoading }] = useLoginMutation()
    const [redirecting, setRedirecting] = useState(false)

    const handleSubmit = async (values: LoginFormData) => {
        try {
            const user = await loginUser(values).unwrap()
            dispatch(setUser({ user }))

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
            size="middle"
            requiredMark="optional"
        >
            <Form.Item
                label={t('auth:email')}
                name="email"
                rules={[
                    { required: true, message: t('auth:email-required') },
                    { type: 'email', message: t('auth:email-type') }
                ]}
            >
                <Input autoComplete="username" />
            </Form.Item>
            <Form.Item
                label={t('auth:password')}
                name="password"
                rules={[{ required: true, message: t('auth:password-required') }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading || redirecting}>
                    {t('auth:submit')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
