import React, { FC, useState } from 'react'
import Link from 'next/link'
import { Form, Input, Button, Checkbox, Typography, message } from 'antd'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useSignupMutation } from 'store/auth/service'
import { SignupFormData, USER_ROLES } from 'types/User'
import { splitName } from 'utils/splitName'
import { handleError } from 'utils/handleError'

type Props = {
    userRole: USER_ROLES,
    initialValues?: Partial<SignupFormData>
}

const { Link: AntLink } = Typography

const SignupForm: FC<Props> = ({ userRole, initialValues }) => {
    const [form] = Form.useForm()
    const router = useRouter()
    const { t } = useTranslation()
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

            await signupUser(dataToSend).unwrap()

            setRedirecting(true)
            message.success(t('auth:account-created-successfully'))
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
            {...(initialValues && { initialValues })}
        >
            <Form.Item
                label={t('auth:name-surname')}
                name="name"
                rules={[{ required: true, message: t('auth:name-surname-required') }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t('auth:email')}
                name="email"
                rules={[
                    { required: true, message: t('auth:email-required') },
                    { type: 'email', message: t('auth:email-type') }
                ]}
            >
                <Input disabled={!!initialValues?.email} />
            </Form.Item>
            <Form.Item
                name="phone"
                label={t('auth:phone')}
                rules={[{ required: true, message: t('auth:phone-required') }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t('auth:password')}
                name="password"
                rules={[{ required: true, message: t('auth:password-required') }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label={t('auth:confirm-password')}
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('auth:confirm-password-required'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('auth:passwords-dont-match')));
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
                            value ? Promise.resolve() : Promise.reject(new Error(t('auth:accept-agreement'))),
                    }
                ]}
            >
                <Checkbox>
                    {t('auth:i-read')} 
                    <Link href="/docs/terms-and-conditions" passHref><AntLink> {t('auth:terms-and-conditions')}</AntLink></Link>
                    {' '}
                    {t('auth:and')}
                    {' '} 
                    <Link href="/docs/privacy-policy" passHref><AntLink>{t('auth:privacy-policy')}</AntLink></Link>
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading || redirecting} style={{ width: '100%' }}>
                    {t('auth:submit')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignupForm
