import React, { FC, useState } from 'react'
import { Layout, Row, Col } from 'antd'

import { SiderContext } from 'components/layouts/SiderContext'
import LayoutTitle from 'components/layouts/AdminLayout/LayoutTitle'
import AdminMenu from 'components/layouts/AdminLayout/AdminMenu'
import styles from './admin-layout.module.less'
import Logo from 'components/misc/Logo'

const { Header, Content, Sider } = Layout

const AdminLayout: FC = ({ children }) => {
    const [siderIsOpen, setSiderIsOpen] = useState(true)

    const siderStyles = `${styles.sider}`
    const layoutStyles = `${styles['content-layout']} ${siderIsOpen ? '' : styles['sider-hidden']}`

    return (
        <Layout className={styles['layout-container']}>
            <SiderContext.Provider value={{siderIsOpen, setSiderIsOpen}}>
                <Sider className={siderStyles} trigger={null} collapsed={!siderIsOpen} collapsible>
                    <Row>
                        <Col span={24} className={styles['logo-container']}>
                            <Logo shortLogo={!siderIsOpen} />
                        </Col>
                        <Col span={24}>
                            <AdminMenu />
                        </Col>
                    </Row>
                </Sider>
                <Layout className={layoutStyles}>
                    <Header className={styles.header}>
                        <LayoutTitle />
                    </Header>
                    <Content className={styles['content-container']}>
                        {children}
                    </Content>
                </Layout>
            </SiderContext.Provider>
        </Layout>
    )
}

export default AdminLayout
