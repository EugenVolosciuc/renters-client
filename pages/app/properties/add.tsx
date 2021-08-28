import type { NextPage } from 'next'
import { Form } from 'antd'

import { USER_ROLES } from 'types/User'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import AdminLayout from 'components/layouts/AdminLayout'
import AddOrEditProperty from 'components/forms/AddOrEditProperty'

const AddProperty: NextPage = () => {
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])
    const [form] = Form.useForm()

    return (
        <AdminLayout header={{ title: "Add property" }}>
            <AddOrEditProperty form={form} />
        </AdminLayout>
    )
}

export default AddProperty
