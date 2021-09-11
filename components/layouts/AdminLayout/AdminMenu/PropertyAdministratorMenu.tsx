import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    TeamOutlined,
    HomeOutlined,
  } from '@ant-design/icons'

import Menu from 'components/layouts/AdminLayout/AdminMenu/Menu'
import { capitalize } from 'utils/parsers/string-manipulation'


const AdminMenu = () => {
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
        }
    ]

    return (
        <Menu menuItems={menuItems} />
    )
}

export default AdminMenu
