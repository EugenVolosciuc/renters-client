import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Dropdown, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useLogoutMutation } from 'store/auth/service'
import styles from 'components/layouts/AdminLayout/AdminLayout.module.less'
import { STORE_RESET_ACTION_TYPE, useAppDispatch } from 'store'
import { setUser } from 'store/auth/slice'
import { locales } from 'next-i18next.config'

const { Link: AntLink } = Typography

const HeaderMenu = () => {
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { t } = useTranslation()

    const handleLogout = async () => {
        await logout()
        dispatch(setUser({ user: null }))
        dispatch({ type: STORE_RESET_ACTION_TYPE })

        router.push('/')
    }

    const handleChangeLanguage = (e: any) => {
        router.replace(router.pathname, router.asPath, { locale: e.key })
    }

    const menu = (
        <Menu className="header-menu">
            <Menu.SubMenu title={t('common:change-language')} icon={<></>}>
                {Object.values(locales).map(locale => {
                    return <Menu.Item key={locale.tag} onClick={handleChangeLanguage}>
                        {t(`common:languages.${locale.label}`)}
                    </Menu.Item>
                })}
            </Menu.SubMenu>
            <Menu.Item>
                <Link href="/app/settings" passHref>
                    <AntLink>
                        {t('common:settings')}
                    </AntLink>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <AntLink onClick={handleLogout}>
                    {t('common:logout')}
                </AntLink>
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
