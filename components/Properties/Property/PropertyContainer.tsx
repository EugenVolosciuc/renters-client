import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

import { capitalize } from 'utils/string-manipulation'
import Tabs from 'components/layouts/AdminLayout/Tabs'
import { usePageQuery } from 'components/layouts/AdminLayout/usePageQuery'
import { PageQuery } from 'types/misc'
import { Property } from 'types/Property'
import {
    DetailsTab,
    RenterTab,
    BillsTab
} from 'components/Properties/Property/tabs'
import ListLoader from 'components/misc/loaders/ListLoader'

type Props = {
    query: {
        type: string
    },
    property: Property | undefined
}

const PropertyContainer: FC<Props> = ({ query: initialQuery, property }) => {
    const { t } = useTranslation()
    const query = usePageQuery(initialQuery) as PageQuery

    const tabsData = [
        {
            tab: t('property:details'),
            key: 'DETAILS',
            content: (
                <>
                    {property
                        ? <DetailsTab property={property} />
                        : <ListLoader />
                    }
                </>
            )
        },
        {
            tab: capitalize(t('common:renter')),
            key: 'RENTER',
            content: <RenterTab />
        },
        {
            tab: t('property:bills'),
            key: 'BILLS',
            content: <BillsTab />
        }
    ]

    return (
        <Row justify="end">
            <Col span={24}>
                <Tabs tabsData={tabsData} defaultActiveTabKey={query.type as string} />
            </Col>
        </Row>
    )
}

export default PropertyContainer
