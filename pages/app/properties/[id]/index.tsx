import { useRouter } from 'next/router'
import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'

import { USER_ROLES } from 'types/User'
import { PropertiesPageTabType } from 'types/Property'
import { EntityTypes } from 'types/misc'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import { useGetPropertyQuery } from 'store/property/service'
import AdminLayout from 'components/layouts/AdminLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PropertyContainer from 'components/Properties/Property/PropertyContainer'
import { useNotFoundRedirect } from 'utils/userRedirects'

const Property = ({ id, query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: property, isError } = useGetPropertyQuery(id)
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    useNotFoundRedirect(isError, EntityTypes.PROPERTY)

    return (
        <AdminLayout header={{ title: property?.title }}>
            <PropertyContainer query={query} property={property} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params, query, locale } = context

    if (!params?.id || typeof params.id !== "string") return { notFound: true }

    return {
        props: { 
            id: parseInt(params.id as string, 10),
            query: {
                type: (query.type || "ALL") as PropertiesPageTabType
            },
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'property']
            ))
        }
    }
}

export default Property
