import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Menu, Dropdown, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { locales } from 'next-i18next.config'

const { Link: AntLink } = Typography

const LanguageChanger = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const handleChangeLanguage = (e: any) => {
        router.replace(router.pathname, router.asPath, { locale: e.key })
    }

    const menu = (
        <Menu>
            {Object.values(locales).map(locale => {
                return <Menu.Item key={locale.tag} onClick={handleChangeLanguage}>
                    {t(`common:languages.${locale.label}`)}
                </Menu.Item>
            })}
        </Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <AntLink>
                {t('common:change-language')} <DownOutlined />
            </AntLink>
        </Dropdown>
    )
}

export default LanguageChanger
