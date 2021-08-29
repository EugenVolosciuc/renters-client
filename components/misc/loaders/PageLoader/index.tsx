import React from 'react'
import { Spin } from 'antd'

import styles from 'components/misc/loaders/PageLoader/PageLoader.module.less'
import { usePageLoading } from 'components/misc/loaders/PageLoader/usePageLoading'

const PageLoader = () => {
    const loading = usePageLoading()

    const loaderStyles = `white-spinner ${styles.loader} ${loading ? styles.show : ''}`

    return <Spin size="small" className={loaderStyles} />
}

export default PageLoader
