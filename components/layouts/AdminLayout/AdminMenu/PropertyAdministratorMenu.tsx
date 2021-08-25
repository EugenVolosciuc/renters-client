import React from 'react'
import { Menu, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    TeamOutlined,
    HomeOutlined,
  } from '@ant-design/icons'

import styles from '../admin-layout.module.less'

const { Link: AntLink } = Typography

const AdminMenu = () => {
    const router = useRouter()

    const menuItems = [
        {
            title: 'Properties',
            icon: HomeOutlined,
            url: '/app/properties'
        },
        {
            title: 'Renters',
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
