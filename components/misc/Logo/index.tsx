import React, { FC } from 'react'
import Link from 'next/link'
import { Typography } from 'antd'

import styles from './logo.module.less'
import PageLoader from 'components/misc/loaders/PageLoader'

const { Title, Link: AntLink } = Typography

type Props = {
    shortLogo?: boolean,
    withPageLoader?: boolean
}

const Logo: FC<Props> = ({ shortLogo = false, withPageLoader = false }) => {
    const bigLogoStyles = `${styles['big-logo']} ${shortLogo ? '' : styles.show}`

    return (
        <Link href="/" passHref>
            <AntLink className={styles.link}>
                <Title level={3} className={styles.logo}>
                    <span>R</span>
                    <span className={bigLogoStyles}>enters</span>
                </Title>
                {withPageLoader && <PageLoader />}
            </AntLink>
        </Link>
    )
}

export default Logo
