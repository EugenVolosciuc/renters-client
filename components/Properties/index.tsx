import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Pagination, Tabs } from 'antd'
import qs from 'qs'

import { PROPERTY_TYPES, PropertyTabType, getPropertyTypeValueAndLabel } from 'types/Property'
import PropertiesList from 'components/Properties/PropertiesList'
import { useGetPropertiesQuery } from 'store/property/service'

type Props = {
    page: number,
    initialType: PropertyTabType,
}

const { TabPane } = Tabs

const PropertiesContainer: FC<Props> = ({ page, initialType }) => {
    const [type, setType] = useState(initialType)
    const router = useRouter()

    const { data: properties, isLoading } = useGetPropertiesQuery(
        { page, type },
        { refetchOnMountOrArgChange: false }
    )

    useEffect(() => {
        const typeQuery = qs.parse(router.asPath.split('?')[1]).type as PropertyTabType | undefined

        setType(typeQuery || initialType)
    }, [router.asPath])

    const typesArray = Object.keys(PROPERTY_TYPES) as Array<keyof typeof PROPERTY_TYPES>

    const handlePaginationChange = (page: number) => {
        const queries = qs.stringify({ ...router.query, page })

        router.push('/app/properties', `/app/properties?${queries}`)
    }

    const handleTabChange = (key: string) => {
        router.push('/app/properties', `/app/properties?type=${key}`)
    }

    const propertiesList = <PropertiesList properties={properties?.data} isLoading={isLoading} />

    return (
        <Row justify="end">
            <Col span={24}>
                <Tabs defaultActiveKey={type} onChange={handleTabChange}>
                    <TabPane tab="All" key="ALL">
                        {propertiesList}
                    </TabPane>
                    {typesArray.map(type => {
                        const typeValueAndLabel = getPropertyTypeValueAndLabel(type as PROPERTY_TYPES)

                        return <TabPane tab={typeValueAndLabel.label} key={typeValueAndLabel.value}>
                            {propertiesList}
                        </TabPane>
                    })}
                </Tabs>
            </Col>
            <Col>
                <Pagination
                    current={page}
                    onChange={handlePaginationChange}
                    total={properties?.total || 1}
                    simple
                />
            </Col>
        </Row>
    )
}

export default PropertiesContainer
