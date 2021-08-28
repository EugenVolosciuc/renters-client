import React, { FC, useState } from 'react'
import Link from 'next/link'
import { Form, Input, Button, Checkbox, Typography, message } from 'antd'
import { useRouter } from 'next/router'

import { useSignupMutation } from 'store/auth/service'
import { SignupFormData, USER_ROLES } from 'types/User'
import { splitName } from 'utils/splitName'
import { handleError } from 'utils/handleError'

type Props = {
    userRole: USER_ROLES
}

const { Link: AntLink } = Typography

const SignupForm: FC<Props> = ({ userRole }) => {
    const [form] = Form.useForm()
    const router = useRouter()
    const [signupUser, { isLoading }] = useSignupMutation()
    const [redirecting, setRedirecting] = useState(false)

    const handleSubmit = async ({ name, email, phone, password }: SignupFormData) => {
        try {
            const { firstName, lastName } = splitName(name)

            const dataToSend = {
                firstName,
                lastName,
                email,
                phone,
                password,
                role: userRole
            }

            await signupUser(dataToSend)

            setRedirecting(true)
            message.success('Account created successfully, please log in')
            router.push('/auth/login')
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <Form
            name="signup"
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            size="middle"
            requiredMark="optional"
        >
            <Form.Item
                label="Name/surname"
                name="name"
                rules={[{ required: true, message: "Please input your name" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email' },
                    { type: 'email', message: 'Please input a valid email' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone number"
                rules={[{ required: true, message: 'Please input your phone number' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input a password" }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match'));
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
            >
                <Checkbox>
                    I have read the 
                    <Link href="/docs/terms-and-conditions" passHref><AntLink> Terms and Conditions</AntLink></Link> and 
                    <Link href="/docs/privacy-policy" passHref><AntLink> Privacy Policy</AntLink></Link>
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading || redirecting} style={{ width: '100%' }}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignupForm
