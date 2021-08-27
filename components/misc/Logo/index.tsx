import React, { FC } from 'react'
import Link from 'next/link'
import { Typography } from 'antd'

import styles from './logo.module.less'

const { Title, Link: AntLink } = Typography

type Props = {
    shortLogo?: boolean
}

const Logo: FC<Props> = ({ shortLogo = false }) => {
    const bigLogoStyles = `${styles['big-logo']} ${shortLogo ? '' : styles.show}`

    return (
        <Link href="/" passHref>
            <AntLink className={styles.link}>
                <Title level={3} className={styles.logo}>
                    <span>R</span>
                    <span className={bigLogoStyles}>enters</span>
                </Title>
            </AntLink>
        </Link>
    )
}

export default Logo
