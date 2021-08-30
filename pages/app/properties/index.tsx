import Link from 'next/link'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'
import PropertiesContainer from 'components/Properties'
import { PropertyTabType } from 'types/Property'

const Properties = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    const addPropertyButton = (
        <Link href="/app/properties/add" passHref>
            <Button
                type="primary"
                icon={<PlusOutlined />}
            >
                Add property
            </Button>
        </Link>
    )

    return (
        <AdminLayout header={{ title: "Properties", extra: [addPropertyButton] }}>
            <PropertiesContainer query={query} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        props: {
            query: {
                page: parseInt(context.query.page as string || "1", 10),
                pageSize: parseInt(context.query.pageSize as string || "10", 10),
                type: (context.query.type || "ALL") as PropertyTabType
            }
        }
    }
}

export default Properties
