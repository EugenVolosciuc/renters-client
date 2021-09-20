import { FC } from "react"
import { useRouter } from "next/router"
import { Card, Table, Row, Col, Button, Modal, message } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import dayjs from "dayjs"

import { Contract } from 'types/Contract'
import { capitalize } from "utils/parsers/string-manipulation"
import { handleError } from "utils/handleError"
import { useModifyPropertyMutation } from "store/property/service"
import { useDeleteContractMutation } from "store/contract/service"
import CardTitle from 'components/misc/CardTitle'

type Props = {
    contracts: Contract[]
}

const { Meta } = Card
const { confirm } = Modal

const History: FC<Props> = ({ contracts }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [modifyProperty] = useModifyPropertyMutation()
    const [deleteContract] = useDeleteContractMutation()

    const handleDeleteContract = (contract: Contract) => {
        return new Promise<void>(async resolve => {
            const contractHasRenter = !!contract.renter

            try {
                if (contractHasRenter) {
                    await modifyProperty({
                        id: contract.propertyId,
                        property: { renter: null }
                    })
                }

                await deleteContract({ contractId: contract.id, propertyId: contract.propertyId })

                message.success(t('property:contract-deleted-successfully'))
            } catch (error) {
                handleError(error)
            }

            resolve()
        })
    }

    const showDeleteContractModal = (contract: Contract) => {
        const contractHasRenter = !!contract.renter

        const content = `${contractHasRenter 
            ? t('property:want-delete-contract-with-renter-content') 
            : t('property:want-delete-contract-without-renter-content')} ${t('common:this-action-cannot-be-reversed')}`

        confirm({
            title: t('property:want-delete-contract-title'),
            icon: <ExclamationCircleOutlined />,
            content,
            okText: t('common:delete'),
            cancelText: t('common:cancel'),
            okButtonProps: { danger: true },
            onOk() { handleDeleteContract(contract) }
        })
    }

    const columns = [
        {
            title: capitalize(t('common:renter')),
            dataIndex: 'renter-name',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                return contract.renter ? `${contract.renter?.firstName} ${contract.renter?.lastName}` : '-'
            }
        },
        {
            title: capitalize(t('property:renter-email')),
            dataIndex: 'renter-email',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const email = contract.renter?.email

                return email ? <a href={`mailto:${email}`}>{email}</a> : '-'
            }
        },
        {
            title: capitalize(t('property:renter-phone')),
            dataIndex: 'renter-phone',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const phone = contract.renter?.phone

                return phone ? <a href={`tel:${phone}`}>{phone}</a> : '-'
            }
        },
        {
            title: t('property:signing-date'),
            dataIndex: 'startDate',
            // eslint-disable-next-line react/display-name
            render: (value: string) => dayjs(value).format('YYYY-MM-DD')
        },
        {
            title: t('property:expiration-date'),
            dataIndex: 'expiration',
            // eslint-disable-next-line react/display-name
            render: (value: string) => dayjs(value).format('YYYY-MM-DD')
        },
        {
            title: t('property:due-date'),
            dataIndex: 'dueDate'
        },
        {
            title: t('common:actions'),
            dataIndex: 'actions',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                return (
                    <Row gutter={[8, 8]}>
                        {contract.url &&
                            <Col>
                                <Button type="link">{t('property:download-contract')}</Button>
                            </Col>
                        }
                        <Col>
                            <Button
                                onClick={() => showDeleteContractModal(contract)}
                                type="link"
                                danger
                            >
                                {t('common:delete')}
                            </Button>
                        </Col>
                    </Row>
                )
            }
        }
    ]

    return (
        <Card>
            <Meta
                title={<CardTitle title={t('property:history')} />}
                description={
                    <Table
                        dataSource={contracts}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                    />
                }
            />
        </Card>
    )
}

export default History
