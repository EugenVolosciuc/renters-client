import { FC } from "react"
import Link from 'next/link'
import { Card, Table, Row, Col, Button } from "antd"
import { useTranslation } from 'react-i18next'

import { Contract } from 'types/Contract'
import dayjs from "dayjs"
import { capitalize } from "utils/parsers/string-manipulation"

type Props = {
    contracts: Contract[]
}

const { Meta } = Card

const History: FC<Props> = ({ contracts }) => {
    const { t } = useTranslation()

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
                                <Button>{t('property:download-contract')}</Button>
                            </Col>
                        }
                    </Row>
                )
            }
        }
    ]

    return (
        <Card>
            <Meta
                title={t('property:history')}
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
