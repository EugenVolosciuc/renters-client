import type { NextPage } from 'next'
import Link from 'next/link'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'

const Properties: NextPage = () => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    
    return (
        <AdminLayout>
            <p>Test</p>
            <Link href="/auth/login" passHref><a>To Login Page</a></Link>
        </AdminLayout>
    )
}

export default Properties
