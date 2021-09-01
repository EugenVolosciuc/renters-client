import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

import { USER_ROLES } from 'types/User'
import AdminLayout from 'components/layouts/AdminLayout'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'

const Profile = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    const { t } = useTranslation()

    return (
        <AdminLayout header={{ title: t('common:my-profile') }}>
            <p>User profile page</p>
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context

    return {
        props: {
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'profile']
            ))
        }
    }
}

export default Profile
