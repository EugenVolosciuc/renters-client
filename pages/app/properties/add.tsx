import type { NextPage } from 'next'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'

const AddProperty: NextPage = () => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    return (
        <AdminLayout header={{ title: "Add property" }}>
            <p>Test</p>
        </AdminLayout>
    )
}

export default AddProperty
