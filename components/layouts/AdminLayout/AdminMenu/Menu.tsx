import React, { FC, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu as AntMenu, Typography } from 'antd'

import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'

type Props = {
    menuItems: {
        title: string,
        icon: FC,
        url: string
    }[]
}

const { Link: AntLink } = Typography

const Menu: FC<Props> = ({ menuItems }) => {
    const router = useRouter()

    return (
        <AntMenu className={styles.menu} theme="dark" mode="inline" selectedKeys={[router.pathname]}>
            {menuItems.map(menuItem => {
                const menuItemIsSelected = router.pathname === menuItem.url
                const menuItemStyles = `${styles['menu-item']} ${menuItemIsSelected ? styles.selected : ''}`

                return <AntMenu.Item className={menuItemStyles} key={menuItem.url} icon={<menuItem.icon />}>
                    <Link href={menuItem.url} passHref><AntLink>{menuItem.title}</AntLink></Link>
                </AntMenu.Item>
            })}
        </AntMenu>
    )
}

export default Menu
