import React, { FC } from 'react'
import { Typography } from 'antd'

import styles from './logo.module.less'

const { Title } = Typography

type Props = {
    shortLogo?: boolean
}

const Logo: FC<Props> = ({ shortLogo = false }) => {
    const bigLogoStyles = `${styles['big-logo']} ${shortLogo ? '' : styles.show}`

    return (
        <Title level={3} className={styles.logo}>
            <span>R</span>
            <span className={bigLogoStyles}>enters</span>
        </Title>
    )
}

export default Logo
