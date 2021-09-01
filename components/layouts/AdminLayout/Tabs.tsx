import React, { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from 'antd'

type Props = {
    tabsData: {
        tab: string,
        key: string,
        content: ReactNode
    }[],
    defaultActiveTabKey?: string
}

const { TabPane } = Tabs

const PageTabs: FC<Props> = ({ tabsData, defaultActiveTabKey }) => {
    const router = useRouter()

    const handleTabChange = (key: string) => {
        router.push(`${router.pathname}`, `${router.asPath.split('?')[0]}?type=${key}`)
    }

    return (
        <Tabs defaultActiveKey={defaultActiveTabKey} onChange={handleTabChange}>
            {tabsData.map(tabData => (
                <TabPane tab={tabData.tab} key={tabData.key}>
                    {tabData.content}
                </TabPane>
            ))}
        </Tabs>
    )
}

export default PageTabs
