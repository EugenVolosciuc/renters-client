import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Pagination, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import qs from 'qs'

import { PROPERTY_TYPES, PropertyTabType, getPropertyTypeValueAndLabel } from 'types/Property'
import PropertiesList from 'components/Properties/PropertiesList'
import { useGetPropertiesQuery } from 'store/property/service'
import { capitalize } from 'utils/string-manipulation'

type Props = {
    query: {
        page: number,
        pageSize: number,
        type: PropertyTabType,
    }
}

const { TabPane } = Tabs

const PropertiesContainer: FC<Props> = ({ query: initialQuery }) => {
    const [query, setQuery] = useState(initialQuery)
    const { t } = useTranslation()
    const router = useRouter()

    const { data: properties, isLoading } = useGetPropertiesQuery(
        query,
        { refetchOnMountOrArgChange: false }
    )

    useEffect(() => {
        const parsedQuery = qs.parse(router.asPath.split('?')[1])
        const updatedTypeQuery = parsedQuery.type as PropertyTabType | undefined
        const updatedPage = parseInt(parsedQuery.page as string || "1", 10) as number

        setQuery({
            ...query,
            type: updatedTypeQuery || query.type,
            page: updatedPage || query.page
        })
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
                <Tabs defaultActiveKey={query.type} onChange={handleTabChange}>
                    <TabPane tab={capitalize(t('properties-common:property-types.all'))} key="ALL">
                        {propertiesList}
                    </TabPane>
                    {typesArray.map(type => {
                        const typeValueAndLabel = getPropertyTypeValueAndLabel(type as PROPERTY_TYPES)

                        return (
                            <TabPane 
                                tab={capitalize(t(`properties-common:property-types.${typeValueAndLabel.label}`, { count: 0 }))} 
                                key={typeValueAndLabel.value}
                            >
                                {propertiesList}
                            </TabPane>
                        )
                    })}
                </Tabs>
            </Col>
            <Col>
                <Pagination
                    current={query.page}
                    onChange={handlePaginationChange}
                    total={properties?.total || 1}
                    pageSize={query.pageSize}
                    simple
                />
            </Col>
        </Row>
    )
}

export default PropertiesContainer
