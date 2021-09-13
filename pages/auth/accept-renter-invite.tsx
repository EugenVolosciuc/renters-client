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
import { Property, PROPERTY_LABELS, PROPERTY_TYPES } from 'types/Property'
import { capitalize } from 'utils/parsers/string-manipulation'
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'

const { Title, Paragraph } = Typography

const AcceptRenterInvite = ({ inviteId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect(false)
    const { t } = useTranslation()
    const { data, isLoading: gettingInvitationData } = useGetInvitationDataQuery(inviteId)

    const leftColumnContent = (
        <Row className={styles['form-container-row']} justify="center" align="middle">
            <Col xs={20} sm={14} md={10} lg={16} xl={12} xxl={10} className={styles['form-container-col']}>
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

    const propertyInfoStructureList: EntityInfoStructure[] = [
        {
            key: 'floor',
            label: capitalize(t('properties-common:floor'))
        },
        {
            key: 'floors',
            label: t('properties-common:total-floors')
        },
        {
            key: 'rooms',
            label: capitalize(t('properties-common:room', { count: 2 }))
        },
        {
            key: 'floorArea',
            label: t('properties-common:floor-area')
        },
    ]

    console.log('data', data)

    const propType = t(`properties-common:property-types.${PROPERTY_LABELS[data?.contract.property.type as PROPERTY_TYPES]}`, { context: 'a' })
    const propTitle = data?.contract.property.title
    const propAddress = data?.contract.property.address
    const propAdmin = data
        ? `${data?.contract.property?.administrator.firstName} ${data?.contract.property?.administrator.lastName}`
        : ''

    const rightColumnContent = (
        <Row className={styles['property-description-container']} justify="center" align="middle">
            <Col xs={20} sm={14} md={10} lg={18} xl={14} xxl={12} className={styles['property-description-col']}>
                {gettingInvitationData
                    ? null
                    : <>
                        <Paragraph>

                            {t(
                                'auth:admin-invited-renter',
                                { propAdmin, propType }
                            )}
                        </Paragraph>
                        <Paragraph>
                            {t('auth:congrats')}
                            {' '}
                            {t(
                                'auth:property-description',
                                { propTitle, propType, propAddress }
                            )}
                        </Paragraph>
                        <EntityInfoDisplay
                            entity={data?.contract.property as Property}
                            entityInfoStructureList={propertyInfoStructureList}
                            showUndefinedValues={false}
                        />
                        <Paragraph style={{ marginTop: 16 }}>{t('auth:renters-description')}</Paragraph>
                    </>
                }
            </Col>
        </Row>
    )

    return (
        <AuthLayout
            leftColumnContent={leftColumnContent}
            rightColumnContent={rightColumnContent}
            hideRightColOnMobile={false}
            invertOnMobile
        />
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, locale } = context

    if (!query.invite_id) return { notFound: true }

    return {
        props: {
            inviteId: query.invite_id as string,
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'auth']
            ))
        }
    }
}

export default AcceptRenterInvite