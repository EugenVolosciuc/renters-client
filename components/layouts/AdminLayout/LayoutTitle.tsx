import React from 'react'
import { Col, Row, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { useSider } from 'components/layouts/SiderContext'
import styles from './admin-layout.module.less'

const { Title } = Typography

const LayoutTitle = () => {
    const { siderIsOpen, toggleSider } = useSider()
    const Icon = siderIsOpen ? MenuFoldOutlined : MenuUnfoldOutlined

    return (
        <Row align="middle">
            <Col>
                <Icon onClick={toggleSider} className={styles.icon} />
            </Col>
            <Col>
                <Title className={styles.title} level={3}>Hello, User</Title>
            </Col>
        </Row>
    )
}

export default LayoutTitle
