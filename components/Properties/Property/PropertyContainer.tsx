import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

import { PageQuery } from 'types/misc'
import { Property } from 'types/Property'
import { User, USER_ROLES } from 'types/User'
import {
    DetailsTab,
    RentalHistory,
    BillsTab
} from 'components/Properties/Property/tabs'
import ListLoader from 'components/misc/loaders/ListLoader'
import Tabs from 'components/layouts/AdminLayout/Tabs'
import { usePageQuery } from 'components/layouts/AdminLayout/usePageQuery'
import { useAuthedUser } from 'store/auth/slice'
import { capitalize } from 'utils/parsers/string-manipulation'

type Props = {
    query: {
        type: string
    },
    property: Property | undefined
}

const PropertyContainer: FC<Props> = ({ query: initialQuery, property }) => {
    const { t } = useTranslation()
    const query = usePageQuery(initialQuery) as PageQuery

    const authedUser = useAuthedUser()

    const authedUserIsRenter = authedUser?.role === USER_ROLES.RENTER

    const tabsData = [
        {
            tab: t('property:details'),
            key: 'DETAILS',
            content: property ? <DetailsTab property={property} /> : <ListLoader />
        },
        {
            tab: t('property:bills'),
            key: 'BILLS',
            content: <BillsTab />
        },
        {
            tab: capitalize(t(`property:${authedUserIsRenter ? 'contract' : 'rental-history'}`)),
            key: 'RENTER',
            content: property ? <RentalHistory property={property} /> : <ListLoader />
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
