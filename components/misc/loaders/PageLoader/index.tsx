import React from 'react'
import { Spin } from 'antd'

import styles from 'components/misc/loaders/PageLoader/PageLoader.module.less'
import { usePageLoading } from 'components/misc/loaders/PageLoader/usePageLoading'

const PageLoader = () => {
    const loading = usePageLoading()

    if (!loading) return null

    return (
        <div className={styles['loader-container']}>
            <div className={styles.background} />
            <Spin size="large" className={styles.spinner} />
        </div>
    )
}

export default PageLoader
