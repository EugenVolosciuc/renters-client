import React, { FC } from 'react'
import { Row, Col, Typography } from 'antd'
import { Property } from 'types/Property'

import styles from 'components/Properties/PropertyItem/PropertyItem.module.less'

type Props = {
    property: Property
}

const { Text } = Typography

const PropertyItemDescription: FC<Props> = ({ property }) => {
    return (
        <Row gutter={[0, 4]}>
            <Col span={24}>
                <Text className={styles['description-text']}>{property.address}</Text>
            </Col>
            <Col span={24}>
                <Row justify="space-between">
                    <Col>
                        <Text className={styles['description-text']}>{property.rooms} rooms</Text>
                    </Col>
                    <Col>
                        <Text className={styles['description-text']}>{property.rentPrice} €</Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PropertyItemDescription
