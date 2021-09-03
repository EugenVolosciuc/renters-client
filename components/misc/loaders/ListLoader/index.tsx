import React, { FC } from 'react'
import { Row, Col, Spin } from 'antd'

import styles from 'components/misc/loaders/ListLoader/ListLoader.module.less'

type Props = {
    size?: "small" | "large" | "default"
}

const ListLoader: FC<Props> = ({ size = 'large'}) => {
    return (
        <Row justify="center">
            <Col>
                <Spin size={size} className={styles.loader} />
            </Col>
        </Row>
    )
}

export default ListLoader
