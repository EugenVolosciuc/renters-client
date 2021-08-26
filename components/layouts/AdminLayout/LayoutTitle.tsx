import React from 'react'
import { Col, Row, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { useSider } from 'components/layouts/SiderContext'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'
import UserLoader from 'components/misc/loaders/UserLoader'
import { useAppSelector } from 'store'
import { selectAuthedUser } from 'store/auth/slice'

const { Title } = Typography

const LayoutTitle = () => {
    const { siderIsOpen, toggleSider } = useSider()
    const user = useAppSelector(selectAuthedUser)

    const Icon = siderIsOpen ? MenuFoldOutlined : MenuUnfoldOutlined

    return (
        <Row align="middle">
            <Col>
                <Icon onClick={toggleSider} className={styles.icon} />
            </Col>
            <Col>
                <UserLoader>
                    <Title className={styles.title} level={3}>Hello, {user?.firstName}</Title>
                </UserLoader>
            </Col>
        </Row>
    )
}

export default LayoutTitle
