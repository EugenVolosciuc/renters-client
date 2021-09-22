import React from 'react'
import { Col, Row, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useSider } from 'components/layouts/SiderContext'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'
import UserLoader from 'components/misc/loaders/UserLoader'
import Logo from 'components/misc/Logo'
import { useAuthedUser } from 'store/user/slice'
import { getTodaysGreeting } from 'utils/getTodaysGreeting'
import { USER_ROLES } from 'types/User'

const { Title } = Typography

const LayoutTitle = () => {
    const { siderIsOpen, toggleSider } = useSider()
    const { t } = useTranslation()
    const user = useAuthedUser()

    const showIcon = user?.role !== USER_ROLES.RENTER
    const Icon = siderIsOpen ? MenuFoldOutlined : MenuUnfoldOutlined

    return (
        <Row align="middle">
            {showIcon
                ? <Col>
                    <Icon onClick={toggleSider} className={styles.icon} />
                </Col>
                : <Col style={{ marginRight: 32 }} className={styles['logo-container']}>
                    <Logo withPageLoader dark />
                </Col>
            }
            <Col>
                <UserLoader>
                    <Title className={styles.title} level={4}>
                        {t(`common:greetings.${getTodaysGreeting()}`, { name: user?.firstName })}
                    </Title>
                </UserLoader>
            </Col>
        </Row>
    )
}

export default LayoutTitle
