import React from 'react'
import {
    DashboardOutlined,
    FieldTimeOutlined
  } from '@ant-design/icons'

import Menu from 'components/layouts/AdminLayout/AdminMenu/Menu'

const menuItems = [
    {
        title: 'Dashboard',
        icon: DashboardOutlined,
        url: '/app/admin/dashboard'
    },
    {
        title: 'Cron jobs',
        icon: FieldTimeOutlined,
        url: '/app/admin/cron'
    }
]

const SuperAdminMenu = () => {
    return <Menu menuItems={menuItems} />
}

export default SuperAdminMenu
