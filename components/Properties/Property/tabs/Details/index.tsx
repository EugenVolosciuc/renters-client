import React, { FC } from 'react'
import { Row, Col, Card, Divider } from 'antd'

import { Property } from 'types/Property'
import PropertyInfo from 'components/Properties/Property/tabs/Details/PropertyInfo'
import PropertyPhotos from 'components/Properties/Property/tabs/Details/PropertyPhotos'

type Props = {
    property: Property
}

const DetailsTab: FC<Props> = ({ property }) => {
    const { photos } = property

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={10} xl={8} xxl={7}>
                    <PropertyInfo property={property} />
                </Col>
                <Col xs={0} md={1}>
                    <Divider style={{ height: '100%' }} type="vertical" />
                </Col>
                {photos && photos.length > 0 &&
                    <Col 
                        className="property-photos-container"
                        xs={24}
                        md={13}
                        xl={15}
                        xxl={16}
                    >
                        <PropertyPhotos photos={photos} />
                    </Col>
                }
            </Row>
        </Card>
    )
}

export default DetailsTab
