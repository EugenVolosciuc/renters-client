import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Form } from 'antd'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'
import AddOrEditProperty from 'components/forms/AddOrEditProperty'

const AddProperty = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    const [form] = Form.useForm()

    return (
        <AdminLayout header={{ title: "Add property" }}>
            <AddOrEditProperty form={form} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context

    return {
        props: {
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'add-property']
            ))
        }
    }
}

export default AddProperty
