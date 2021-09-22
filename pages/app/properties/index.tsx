import Link from 'next/link'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { capitalize } from 'utils/parsers/string-manipulation'
import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/user/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'
import PropertiesContainer from 'components/Properties/PropertiesContainer'
import { PropertiesPageTabType } from 'types/Property'

const Properties = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation()
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    const addPropertyButton = (
        <Link href="/app/properties/add" passHref>
            <Button
                type="primary"
                icon={<PlusOutlined />}
            >
                {t('properties-common:add-property')}
            </Button>
        </Link>
    )

    return (
        <AdminLayout 
            header={{ 
                title: capitalize(t('common:property', { count: 2 })), 
                extra: [addPropertyButton] 
            }}
        >
            <PropertiesContainer query={query} />
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
                type: (query.type || "ALL") as PropertiesPageTabType
            },
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'properties']
            ))
        }
    }
}

export default Properties
