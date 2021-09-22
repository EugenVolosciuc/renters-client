import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { USER_ROLES } from 'types/User'
import AdminLayout from 'components/layouts/AdminLayout'
import { useAuthRedirect } from 'store/user/useAuthRedirect'

const Renters = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    return (
        <AdminLayout header={{ title: 'Renters' }}>
            <p>Renters page</p>
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context

    return {
        props: {
            ...(await serverSideTranslations(
                locale as string,
                ['common']
            ))
        }
    }
}

export default Renters
