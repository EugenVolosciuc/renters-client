import { FC } from 'react'
import { Modal, Form, Typography, message } from "antd"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import DatePicker from 'components/misc/antd-overwrites/DatePicker'
import dayjs, { Dayjs } from 'dayjs'

import { useModifyContractMutation } from 'store/contract/service'
import { handleError } from 'utils/handleError'
import { Contract } from 'types/Contract'
import { Property } from 'types/Property'

type Props = {
    visible: boolean,
    handleCancel: Function,
    contractId: Contract['id'],
    propertyId: Property['id'],
    currentExpirationDate: Dayjs
}

const { Paragraph } = Typography

const ExtendContract: FC<Props> = ({ visible, handleCancel, contractId, propertyId, currentExpirationDate }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [form] = Form.useForm()
    const [modifyContract, { isLoading: contractUpdateLoading }] = useModifyContractMutation()

    const handleSubmit = () => {
        form
            .validateFields()
            .then(async ({ expirationDate }: { expirationDate: Dayjs }) => {
                try {
                    await modifyContract({
                        contractId,
                        propertyId,
                        contract: { expirationDate: expirationDate.toDate() },
                    })

                    message.success(t('property:contract-extended-successfully'))

                    // TODO: fix cache not being invalidated, asked question here:
                    // https://stackoverflow.com/questions/69243083/rtk-query-invalidate-cache-of-an-api-service-from-another-api-service
                    // until then - reload page
                    router.reload()
                    // handleCancel()
                } catch (error) {
                    handleError(error)
                }
            })
    }

    const initialValues = { expirationDate: currentExpirationDate.add(1, 'year') }

    return (
        <Modal
            title={t('property:extend-contract')}
            visible={visible}
            okText={t('property:extend')}
            onOk={handleSubmit}
            cancelText={t('common:cancel')}
            onCancel={() => handleCancel()}
            okButtonProps={{ loading: contractUpdateLoading }}
        >
            <Paragraph>{t('property:choose-new-expiration-date')}</Paragraph>
            <Form
                form={form}
                name="extend-contract"
                layout="vertical"
                requiredMark="optional"
                onFinish={handleSubmit}
                initialValues={initialValues}
            >
                <Form.Item
                    name="expirationDate"
                    label={t('add-edit-property:expiration-date')}
                    rules={[
                        {
                            required: true,
                            message: t('add-edit-property:expiration-date-required')
                        },
                        () => ({
                            validator(_, value) {
                                if ((value as Dayjs).isBefore(dayjs(), 'day')) {
                                    return Promise.reject(new Error(t('add-edit-property:expiration-date-is-before-today')))
                                }

                                return Promise.resolve()
                            }
                        })
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ExtendContract
