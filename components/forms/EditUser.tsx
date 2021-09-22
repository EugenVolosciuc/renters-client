import { MouseEventHandler, FC } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useTranslation } from 'next-i18next'

import UserLoader from 'components/misc/loaders/UserLoader'
import { useAppDispatch } from 'store'
import { useAuthedUser, setUser } from 'store/user/slice'
import { useModifyAuthedUserMutation } from 'store/user/service'
import { SignupFormData } from 'types/User'
import { shallowEqual } from 'utils/equals'
import { handleError } from 'utils/handleError'
import { splitName } from 'utils/splitName'

type Props = {
    cancel: MouseEventHandler<HTMLButtonElement>,
    onSuccess?: Function
}

const EditUser: FC<Props> = ({ cancel, onSuccess }) => {
    const [modifyUser, { isLoading }] = useModifyAuthedUserMutation()
    const dispatch = useAppDispatch()

    const { t } = useTranslation()
    const [form] = Form.useForm()
    const user = useAuthedUser()

    const handleSubmit = async ({ name, email, phone }: SignupFormData) => {
        try {
            const { firstName, lastName } = splitName(name)

            const dataToSend = {
                firstName,
                lastName,
                email,
                phone
            }

            const updatedUser = await modifyUser(dataToSend).unwrap()
            dispatch(setUser({ user: updatedUser }))

            message.success(t('auth:user-updated'))
            if (onSuccess) onSuccess()
        } catch (error) {
            handleError(error)
        }
    }

    const initialValues = {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
        phone: user?.phone
    }

    return (
        <UserLoader>
            <Form
                name="edit-user"
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                size="middle"
                requiredMark="optional"
                initialValues={initialValues}
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label={t('auth:phone')}
                    rules={[{ required: true, message: t('auth:phone-required') }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => <>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            disabled={shallowEqual(initialValues, form.getFieldsValue(true))}
                        >
                            {t('auth:submit')}
                        </Button>
                        <Button
                            style={{ marginLeft: 16 }}
                            onClick={cancel}
                            disabled={isLoading}
                        >
                            {t('common:cancel')}
                        </Button>
                    </>}
                </Form.Item>
            </Form>
        </UserLoader>
    )
}

export default EditUser
