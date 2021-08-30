import React from 'react'
import { Menu, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import {
    TeamOutlined,
    HomeOutlined,
  } from '@ant-design/icons'

import { capitalize } from 'utils/string-manipulation'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'

const { Link: AntLink } = Typography

const AdminMenu = () => {
    const router = useRouter()
    const { t } = useTranslation()

    const menuItems = [
        {
            title: capitalize(t('common:property', { count: 0 })),
            icon: HomeOutlined,
            url: '/app/properties'
        },
        {
            title: capitalize(t('common:renter', { count: 0 })),
            icon: TeamOutlined,
            url: '/app/renters'
        },
    ]

    return (
        <Menu className={styles.menu} theme="dark" mode="inline" selectedKeys={[router.pathname]}>
            {menuItems.map(menuItem => {
                const menuItemIsSelected = router.pathname === menuItem.url
                const menuItemStyles = `${styles['menu-item']} ${menuItemIsSelected ? styles.selected : ''}`

                return <Menu.Item className={menuItemStyles} key={menuItem.url} icon={<menuItem.icon />}>
                    <Link href={menuItem.url} passHref><AntLink>{menuItem.title}</AntLink></Link>
                </Menu.Item>
            })}
        </Menu>
    )
}

export default AdminMenu
