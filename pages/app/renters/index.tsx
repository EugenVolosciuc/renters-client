import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

import { USER_ROLES } from 'types/User'
import { PaginatedPageQuery } from 'types/misc'
import AdminLayout from 'components/layouts/AdminLayout'
import { usePageQuery } from 'components/layouts/AdminLayout/usePageQuery'
import RentersContainer from 'components/Users/RentersContainer'
import { useAuthRedirect } from 'store/user/useAuthRedirect'
import { capitalize } from 'utils/parsers/string-manipulation'

const Renters = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation()
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    return (
        <AdminLayout header={{ title: capitalize(t('common:renter', { count: 0 })) }}>
            <RentersContainer query={query} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, locale } = context

    return {
        props: {
            query: {
                page: parseInt(query.page as string || "1", 10),
                pageSize: parseInt(query.pageSize as string || "10", 10),
            },
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'property']
            ))
        }
    }
}

export default Renters
