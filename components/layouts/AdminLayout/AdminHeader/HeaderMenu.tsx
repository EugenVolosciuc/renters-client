import React, { useState } from 'react'
import router, { useRouter } from 'next/router'
import { Menu, Dropdown, Typography, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useLogoutMutation } from 'store/auth/service'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'
import { useAppDispatch } from 'store'
import { setUser } from 'store/auth/slice'

const { Link: AntLink } = Typography

const HeaderMenu = () => {
    const [redirecting, setRedirecting] = useState(false)
    const [logout, { isLoading }] = useLogoutMutation()
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        await logout(null)
        dispatch(setUser({ user: null }))

        setRedirecting(true)
        router.push('/')
    }
    
    const menu = (
        <Menu>
            <Menu.Item>
                <Button 
                    loading={isLoading || redirecting} 
                    onClick={handleLogout} 
                    type="link"
                >
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <AntLink>
                <UserOutlined className={styles['menu-icon']} />
            </AntLink>
        </Dropdown>
    )
}

export default HeaderMenu
