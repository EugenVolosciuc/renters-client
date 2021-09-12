import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { Row, Col, Typography } from 'antd'
import { useTranslation } from 'next-i18next'

import AuthLayout from 'components/layouts/AuthLayout'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import SignupForm from 'components/forms/Signup'
import styles from 'styles/pages/AuthPages.module.less'
import { USER_ROLES } from 'types/User'

const { Title, Text, Link: AntLink } = Typography

const Signup = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect(false)
    const { t } = useTranslation()

    const leftColumnContent = (
        <Row className={styles['form-container-row']} justify="center" align="middle">
            <Col xs={20} sm={14} md={10} lg={16} xl={12} xxl={10} className={styles['form-container-col']}>
                <Title level={3} className={styles['login-text']}>
                    {t('auth:sign-up')}
                </Title>
                <SignupForm userRole={USER_ROLES.PROPERTY_ADMIN} />
                <Text>
                    {t('auth:have-account-login')}
                    {' '}
                    <Link href="/auth/login" passHref>
                        <AntLink>{t('auth:here')}!</AntLink>
                    </Link>
                </Text>
            </Col>
        </Row>
    )
    const rightColumnContent = <></>

    return (
        <AuthLayout leftColumnContent={leftColumnContent} rightColumnContent={rightColumnContent} />
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context
    
    return {
        props: {
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'auth']
            ))
        }
    }
}

export default Signup
