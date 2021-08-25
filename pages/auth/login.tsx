import type { NextPage } from 'next'
import { Row, Col, Typography } from 'antd'

import LoginForm from 'components/forms/Login'
import styles from 'styles/pages/login.module.less'

const { Title } = Typography

const Login: NextPage = () => {
    return (
        <Row className={styles.container}>
            <Col xs={24} lg={12} className={styles['form-container']}>
                <Row className={styles['form-container-row']} justify="center" align="middle">
                    <Col xs={20} sm={14} md={10} lg={14} xl={12} className={styles['form-container-col']}>
                        <Title level={2} className={styles.logo}>Renters</Title>
                        <Title level={3} className={styles['login-text']}>Login</Title>
                        <LoginForm />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} lg={12} className={styles['info-container']}>

            </Col>
        </Row>
    )
}

export default Login
