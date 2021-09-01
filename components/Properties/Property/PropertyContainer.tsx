import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

import { capitalize } from 'utils/string-manipulation'
import Tabs from 'components/layouts/AdminLayout/Tabs'
import { usePageQuery } from 'components/layouts/AdminLayout/usePageQuery'
import { PageQuery } from 'types/misc'

type Props = {
    query: {
        type: string;
    };
}

const PropertyContainer: FC<Props> = ({ query: initialQuery }) => {
    const { t } = useTranslation()
    const query = usePageQuery(initialQuery) as PageQuery

    const tabsData = [
        {
            tab: t('property:details'),
            key: 'DETAILS',
            content: 'Details'
        },
        {
            tab: capitalize(t('common:renter')),
            key: 'RENTER',
            content: 'Renter'
        },
        {
            tab: t('property:bills'),
            key: 'BILLS',
            content: 'Bills'
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
