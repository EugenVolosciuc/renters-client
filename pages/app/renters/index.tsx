import type { NextPage } from 'next'

import { USER_ROLES } from 'types/User'
import AdminLayout from 'components/layouts/AdminLayout'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'

const Renters: NextPage = () => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    return (
        <AdminLayout>
            <p>Renters page</p>
        </AdminLayout>
    )
}

export default Renters
