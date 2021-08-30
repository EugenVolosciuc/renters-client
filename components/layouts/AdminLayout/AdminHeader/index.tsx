import React from 'react'
import { Layout } from 'antd'

import LayoutTitle from 'components/layouts/AdminLayout/LayoutTitle'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'
import HeaderMenu from 'components/layouts/AdminLayout/AdminHeader/HeaderMenu'

const { Header } = Layout

const AdminHeader = () => {
    return (
        <Header className={styles.header}>
            <LayoutTitle />
            <div>
                <HeaderMenu />
            </div>
        </Header>
    )
}

export default AdminHeader
