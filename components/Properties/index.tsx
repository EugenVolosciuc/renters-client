import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Pagination, Tabs } from 'antd'
import qs from 'qs'

import { PROPERTY_TYPES, PropertyTabType, getPropertyTypeValueAndLabel } from 'types/Property'

type Props = {
    pagination: {
        page: number,
        total: number
    },
    type: PropertyTabType
}

const { TabPane } = Tabs

const PropertiesContainer: FC<Props> = ({ pagination, type }) => {
    const router = useRouter()
    const { page, total } = pagination

    const typesArray = Object.keys(PROPERTY_TYPES) as Array<keyof typeof PROPERTY_TYPES>

    const handlePaginationChange = (page: number) => {
        const queries = qs.stringify({ ...router.query, page })

        router.push('/app/properties', `/app/properties?${queries}`)
    }

    const handleTabChange = (key: string) => {
        router.push('/app/properties', `/app/properties?type=${key}`)
    }

    return (
        <Row justify="end">
            <Col span={24}>
                <Tabs defaultActiveKey={type} onChange={handleTabChange}>
                    <TabPane tab="All" key="ALL">
                        All
                    </TabPane>
                    {typesArray.map(type => {
                        const typeValueAndLabel = getPropertyTypeValueAndLabel(type as PROPERTY_TYPES)

                        return <TabPane tab={typeValueAndLabel.label} key={typeValueAndLabel.value}>
                            {typeValueAndLabel.label}
                        </TabPane>
                    })}
                </Tabs>
            </Col>
            <Col>
                <Pagination
                    current={page}
                    onChange={handlePaginationChange}
                    total={total}
                    simple
                />
            </Col>
        </Row>
    )
}

export default PropertiesContainer
