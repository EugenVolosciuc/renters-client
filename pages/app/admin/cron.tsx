import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { USER_ROLES } from 'types/User'
import AdminLayout from 'components/layouts/AdminLayout'
import CronJobsContainer from 'components/CronJobs/CronJobsContainer'

const Cron = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <AdminLayout 
            header={{ title: 'Cron jobs' }}
            allowedUsersSetting={[USER_ROLES.SUPER_ADMIN]}
        >
            <CronJobsContainer />
        </AdminLayout>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context

    return {
        props: {
            ...(await serverSideTranslations(
                locale as string,
                ['common']
            ))
        }
    }
}

export default Cron