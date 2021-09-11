import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

import { PROPERTY_TYPES, PropertiesPageTabType, getPropertyTypeValueAndLabel } from 'types/Property'
import PropertiesList from 'components/Properties/PropertiesList'
import { useGetPropertiesQuery } from 'store/property/service'
import { capitalize } from 'utils/parsers/string-manipulation'
import Pagination from 'components/layouts/AdminLayout/Pagination'
import Tabs from 'components/layouts/AdminLayout/Tabs'
import { usePageQuery } from 'components/layouts/AdminLayout/usePageQuery'
import { PaginatedPageQuery } from 'types/misc'

type Props = {
    query: {
        page: number,
        pageSize: number,
        type: PropertiesPageTabType
    }
}

const PropertiesContainer: FC<Props> = ({ query: initialQuery }) => {
    const { t } = useTranslation()
    const query = usePageQuery(initialQuery) as PaginatedPageQuery

    const { data: properties, isLoading } = useGetPropertiesQuery(
        query,
        { refetchOnMountOrArgChange: false }
    )

    const typesArray = Object.keys(PROPERTY_TYPES) as Array<keyof typeof PROPERTY_TYPES>

    const propertiesList = <PropertiesList properties={properties?.data} isLoading={isLoading} />

    const tabsData = [
        {
            tab: capitalize(t('properties-common:property-types.all')),
            key: "ALL",
            content: propertiesList
        },
        ...typesArray.map(type => {
            const typeValueAndLabel = getPropertyTypeValueAndLabel(type as PROPERTY_TYPES)
            
            return {
                tab: capitalize(t(`properties-common:property-types.${typeValueAndLabel.label}`, { count: 0 })),
                key: typeValueAndLabel.value,
                content: propertiesList
            }
        })
    ]
    
    return (
        <Row justify="end">
            <Col span={24}>
                <Tabs 
                    tabsData={tabsData} 
                    defaultActiveTabKey={query.type as string | undefined} 
                />
            </Col>
            <Col>
                <Pagination
                    query={query}
                    paginatedData={properties}
                />
            </Col>
        </Row>
    )
}

export default PropertiesContainer
