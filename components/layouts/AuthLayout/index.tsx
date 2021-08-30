import React, { FC, ReactNode } from 'react'
import { Row, Col } from 'antd'

import styles from 'components/layouts/AuthLayout/AuthLayout.module.less'

type Props = {
    leftColumnContent: ReactNode,
    rightColumnContent: ReactNode
}

const AuthLayout: FC<Props> = ({ leftColumnContent, rightColumnContent }) => {
    return (
        <Row className={styles.container}>
            <Col xs={24} lg={12} className={styles['form-container']}>
                {leftColumnContent}
            </Col>
            <Col xs={24} lg={12} className={styles['info-container']}>
                {rightColumnContent}
            </Col>
        </Row>
    )
}

export default AuthLayout
