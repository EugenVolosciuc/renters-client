import React, { FC } from 'react'
import { Spin } from 'antd'

import styles from 'components/misc/loaders/PageLoader/PageLoader.module.less'
import { usePageLoading } from 'components/misc/loaders/PageLoader/usePageLoading'

type Props = {
    dark?: boolean
}

const PageLoader: FC<Props> = ({ dark = false }) => {
    const loading = usePageLoading()

    const loaderStyles = `${dark ? 'spinner-dark' : 'spinner-white'} ${styles.loader} ${loading ? styles.show : ''}`

    return <Spin size="small" className={loaderStyles} />
}

export default PageLoader
