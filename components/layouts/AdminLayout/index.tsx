import React, { FC, ReactNode, useState } from 'react'
import { Layout, Row, Col, Typography } from 'antd'

import { SiderContext } from 'components/layouts/SiderContext'
import AdminMenu from 'components/layouts/AdminLayout/AdminMenu'
import AdminHeader from 'components/layouts/AdminLayout/AdminHeader'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'
import Logo from 'components/misc/Logo'

const { Content, Sider } = Layout
const { Title } = Typography

type Props = {
    header: {
        title: string,
        extra?: ReactNode[]
    }
}

const AdminLayout: FC<Props> = ({ children, header }) => {
    const [siderIsOpen, setSiderIsOpen] = useState(true)

    const layoutStyles = `${styles['content-layout']} ${siderIsOpen ? '' : styles['sider-hidden']}`

    return (
        <Layout className={styles['layout-container']}>
            <SiderContext.Provider value={{ siderIsOpen, setSiderIsOpen }}>
                <Sider className={styles.sider} trigger={null} collapsed={!siderIsOpen} collapsible>
                    <Row>
                        <Col span={24} className={styles['logo-container']}>
                            <Logo shortLogo={!siderIsOpen} withPageLoader />
                        </Col>
                        <Col span={24}>
                            <AdminMenu />
                        </Col>
                    </Row>
                </Sider>
                <Layout className={layoutStyles}>
                    <AdminHeader />
                    <Content className={styles['content-container']}>
                        <div className={styles['content-header']}>
                            <Title className={styles.title} level={4}>{header.title}</Title>
                            {header.extra && header.extra.map((node, index) => (
                                <span key={`content-header-extra-${index}`} className={styles['extra-container']}>
                                    {node}
                                </span>
                            ))}
                        </div>
                        {children}
                    </Content>
                </Layout>
            </SiderContext.Provider>
        </Layout>
    )
}

export default AdminLayout
