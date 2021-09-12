import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Row, Col, Typography } from 'antd'

import AuthLayout from 'components/layouts/AuthLayout'
import SignupForm from 'components/forms/Signup'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import { useGetInvitationDataQuery } from 'store/auth/service'
import { USER_ROLES } from 'types/User'
import styles from 'styles/pages/AuthPages.module.less'

const { Title } = Typography

const AcceptRenterInvite = ({ inviteId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect(false)
    const { t } = useTranslation()
    const { data, isLoading: gettingInvitationData, isSuccess, isError } = useGetInvitationDataQuery(inviteId)

    console.log('data', data)

    const leftColumnContent = (
        <Row className={styles['form-container-row']} justify="center" align="middle">
            <Col xs={18} sm={14} md={10} lg={14} xl={10} className={styles['form-container-col']}>
                <Title level={3} className={styles['login-text']}>
                    {t('auth:sign-up')}
                </Title>
                {gettingInvitationData
                    ? null
                    : <SignupForm 
                        userRole={USER_ROLES.RENTER} 
                        initialValues={{ name: data?.renterName, email: data?.renterEmail }} 
                    />
                }
            </Col>
        </Row>
    )

    const rightColumnContent = (<></>)

    return (
        <AuthLayout leftColumnContent={leftColumnContent} rightColumnContent={rightColumnContent} />
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, locale } = context

    console.log('query', query)

    if (!query.invite_id) return { notFound: true }

    return {
        props: {
            inviteId: query.invite_id as string,
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'auth']
            ))
        }
    }
}

export default AcceptRenterInvite