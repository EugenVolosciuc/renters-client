import React from 'react'
import { Row, Col, Spin } from 'antd'

import styles from 'components/misc/loaders/ListLoader/ListLoader.module.less'

const ListLoader = () => {
    return (
        <Row justify="center">
            <Col>
                <Spin size="large" className={styles.loader} />
            </Col>
        </Row>
    )
}

export default ListLoader
