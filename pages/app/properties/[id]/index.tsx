import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { USER_ROLES } from 'types/User'
import { EntityTypes } from 'types/misc'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import { useGetPropertyQuery } from 'store/property/service'
import AdminLayout from 'components/layouts/AdminLayout'
import PropertyContainer from 'components/Properties/Property/PropertyContainer'
import { useNotFoundRedirect } from 'utils/userRedirects'

const Property = ({ id, query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: property, isError } = useGetPropertyQuery(id)
    const { t } = useTranslation()

    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    useNotFoundRedirect(isError, EntityTypes.PROPERTY)

    const editPropertyButton = (
        <Link href="/app/properties/[id]/edit" as={`/app/properties/${id}/edit`} passHref>
            <Button
                type="primary"
                icon={<EditOutlined />}
            >
                {t('properties-common:edit-property')}
            </Button>
        </Link>
    )

    return (
        <AdminLayout 
            header={{ 
                title: property?.title,
                extra: [editPropertyButton]
            }}
        >
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
                type: query.type || "DETAILS"
            },
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'property']
            ))
        }
    }
}

export default Property
