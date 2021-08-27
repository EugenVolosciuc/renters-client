import type { NextPage } from 'next'
import Link from 'next/link'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'

const Properties: NextPage = () => {
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
        <AdminLayout 
            header={{ 
                title: "Properties", 
                extra: [addPropertyButton] 
            }}
        >
            <p>Test</p>
            <Link href="/auth/login" passHref><a>To Login Page</a></Link>
        </AdminLayout>
    )
}

export default Properties
