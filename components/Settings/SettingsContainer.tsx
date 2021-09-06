import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Tabs from 'components/layouts/AdminLayout/Tabs'
import { usePageQuery } from 'components/layouts/AdminLayout/usePageQuery'
import { PageQuery } from 'types/misc'
import ProfileTab from 'components/Settings/tabs/Profile'

type Props = {
    query: {
        type: string
    }
}

const SettingsContainer: FC<Props> = ({ query: initialQuery }) => {
    const { t } = useTranslation()
    const query = usePageQuery(initialQuery) as PageQuery

    const tabsData = [
        {
            tab: t('settings:profile'),
            key: "PROFILE",
            content: <ProfileTab />
        },
        {
            tab: t('settings:notifications'),
            key: "NOTIFICATIONS",
            content: 'Notifications content'
        },
        {
            tab: t('settings:payments'),
            key: "PAYMENTS",
            content: 'Payments content'
        },

    ]

    return (
        <Tabs
            tabsData={tabsData}
            defaultActiveTabKey={query.type as string | undefined}
        />
    )
}

export default SettingsContainer
