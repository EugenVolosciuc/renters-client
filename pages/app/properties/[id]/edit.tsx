import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'
import AddOrEditProperty from 'components/forms/AddOrEditProperty'
import ListLoader from 'components/misc/loaders/ListLoader'
import { useGetPropertyQuery } from 'store/property/service'
import { useNotFoundRedirect } from 'utils/userRedirects'
import { USER_ROLES } from 'types/User'
import { EntityTypes } from 'types/misc'

const EditProperty = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { data: property, isError, isLoading } = useGetPropertyQuery(id)

    useNotFoundRedirect(isError, EntityTypes.PROPERTY)
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    return (
        <AdminLayout 
            header={{ 
                title: `${t('properties-common:edit-property')}${!!property ? ` - ${property.title}` : ''}` 
            }}
        >
            {isLoading
                ? <ListLoader />
                : <AddOrEditProperty form={form} property={property} />
            }
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale, params } = context

    if (!params?.id || typeof params.id !== "string") return { notFound: true }

    return {
        props: {
            id: parseInt(params.id as string, 10),
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'add-edit-property']
            ))
        }
    }
}

export default EditProperty
