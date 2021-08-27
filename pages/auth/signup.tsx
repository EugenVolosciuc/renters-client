import { NextPage } from 'next'
import Link from 'next/link'
import { Row, Col, Typography } from 'antd'

import AuthLayout from 'components/layouts/AuthLayout'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import SignupForm from 'components/forms/Signup'
import styles from 'styles/pages/AuthPages.module.less'
import { USER_ROLES } from 'types/User'

const { Title, Text, Link: AntLink } = Typography

const leftColumnContent = (
    <Row className={styles['form-container-row']} justify="center" align="middle">
        <Col xs={18} sm={14} md={10} lg={14} xl={10} className={styles['form-container-col']}>
            <Title level={3} className={styles['login-text']}>Sign up</Title>
            <SignupForm userRole={USER_ROLES.PROPERTY_ADMIN} />
            <Text>
                Already have an account? Login 
                <Link href="/auth/login" passHref>
                    <AntLink> here!</AntLink>
                </Link>
            </Text>
        </Col>
    </Row>
)
const rightColumnContent = <></>

const Signup: NextPage = () => {
    useAuthRedirect(false)

    return (
        <AuthLayout leftColumnContent={leftColumnContent} rightColumnContent={rightColumnContent} />
    )
}

export default Signup
