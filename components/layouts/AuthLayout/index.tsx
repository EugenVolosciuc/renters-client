import React, { FC, ReactNode } from 'react'
import { Row, Col } from 'antd'

import styles from 'components/layouts/AuthLayout/AuthLayout.module.less'

type Props = {
    leftColumnContent: ReactNode,
    rightColumnContent: ReactNode,
    hideRightColOnMobile?: boolean,
    invertOnMobile?: boolean
}

const AuthLayout: FC<Props> = ({ 
    leftColumnContent, 
    rightColumnContent, 
    hideRightColOnMobile = true, 
    invertOnMobile = false 
}) => {
    const containerStyles = `
        ${styles.container} 
        ${hideRightColOnMobile ? '' : styles['with-right-col-on-mobile']} 
        ${invertOnMobile ? styles['invert-on-mobile'] : ''}
    `
    const rightColStyles = `${styles['info-container']}`

    return (
        <Row className={containerStyles}>
            <Col xs={24} lg={12} className={styles['form-container']}>
                {leftColumnContent}
            </Col>
            <Col xs={24} lg={12} className={rightColStyles}>
                {rightColumnContent}
            </Col>
        </Row>
    )
}

export default AuthLayout
