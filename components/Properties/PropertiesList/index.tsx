import React, { FC } from 'react'
import { Row, Col, Empty } from 'antd'

import { Property } from 'types/Property'
import ListLoader from 'components/misc/loaders/ListLoader'
import PropertyItem from 'components/Properties/PropertyItem'
import styles from 'components/Properties/PropertiesList/PropertiesList.module.less'

type Props = {
    properties: Property[] | undefined,
    isLoading: boolean
}

const PropertiesList: FC<Props> = ({ properties, isLoading }) => {
    if (isLoading) return <ListLoader />

    if (!properties || properties.length === 0) return (
        <Empty description="No properties found" />
    )

    return (
        <Row gutter={16} className={styles.list}>
            {properties.map(property => (
                <Col key={`property-${property.id}`}>
                    <PropertyItem property={property} />
                </Col>
            ))}
        </Row>
    )
}

export default PropertiesList
