import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

import { USER_ROLES } from 'types/User'
import AdminLayout from 'components/layouts/AdminLayout'
import AddOrEditProperty from 'components/forms/AddOrEditProperty'

const AddProperty = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation()
    const [form] = Form.useForm()

    return (
        <AdminLayout 
            header={{ title: t('properties-common:add-property') }}
            allowedUsersSetting={[USER_ROLES.PROPERTY_ADMIN]}    
        >
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
                ['common', 'properties-common', 'add-edit-property']
            ))
        }
    }
}

export default AddProperty
