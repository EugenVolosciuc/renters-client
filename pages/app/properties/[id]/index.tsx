import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'

const Property = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    return (
        <AdminLayout header={{ title: "Property " + id }}>

        </AdminLayout>
    )
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        props: {
            id: context.params!.id
        }
    }
}

export default Property
