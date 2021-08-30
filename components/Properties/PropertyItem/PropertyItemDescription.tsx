import React, { FC } from 'react'
import { Row, Col, Typography } from 'antd'
import { Property } from 'types/Property'
import { useTranslation } from 'react-i18next'

import styles from 'components/Properties/PropertyItem/PropertyItem.module.less'

type Props = {
    property: Property
}

const { Text } = Typography

const PropertyItemDescription: FC<Props> = ({ property }) => {
    const { address, rooms, rentPrice } = property
    const { t } = useTranslation()

    return (
        <Row gutter={[0, 4]}>
            <Col span={24}>
                <Text className={styles['description-text']}>{address}</Text>
            </Col>
            <Col span={24}>
                <Row justify="space-between">
                    {rooms &&
                        <Col>
                            <Text className={styles['description-text']}>{t('properties-common:room-with-count', { count: rooms })}</Text>
                        </Col>
                    }
                    <Col>
                        <Text className={styles['description-text']}>{rentPrice} €</Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PropertyItemDescription
