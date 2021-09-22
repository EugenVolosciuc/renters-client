import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { skipToken } from '@reduxjs/toolkit/dist/query'

import { useNotFoundRedirect } from 'utils/userRedirects'
import AdminLayout from 'components/layouts/AdminLayout'
import PropertyContainer from 'components/Properties/Property/PropertyContainer'
import { useGetPropertyQuery } from 'store/property/service'
import { useAuthRedirect } from 'store/user/useAuthRedirect'
import { useAuthedUser } from 'store/user/slice'
import { EntityTypes } from 'types/misc'
import { USER_ROLES } from 'types/User'

const Renter = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation()
    const user = useAuthedUser()
    const { data: property, isError } = useGetPropertyQuery(user?.rentContract?.propertyId ?? skipToken)

    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    useNotFoundRedirect(isError, EntityTypes.PROPERTY)

    return (
        <AdminLayout header={{ title: property?.title }}>
            <PropertyContainer query={query} property={property} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, locale } = context

    return {
        props: {
            query: {
                type: (query.type || "DETAILS") as string
            },
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'property']
            ))
        }
    }
}

export default Renter