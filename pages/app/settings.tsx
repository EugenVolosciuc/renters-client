import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

import { USER_ROLES } from 'types/User'
import AdminLayout from 'components/layouts/AdminLayout'
import SettingsContainer from 'components/Settings/SettingsContainer'

const Profile = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation()

    return (
        <AdminLayout 
            header={{ title: t('settings:account-settings') }}
            allowedUsersSetting={[USER_ROLES.PROPERTY_ADMIN]}
        >
            <SettingsContainer query={query} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, locale } = context

    return {
        props: {
            query: {
                type: (query.type || "PROFILE") as string
            },
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'settings', 'auth']
            ))
        }
    }
}

export default Profile
