import { baseApi } from 'store/baseApi'
import { CronJob } from 'types/CronJob'

export const cronApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCronJobs: builder.query<CronJob[], void>({
            query: () => ({
                url: '/admin/cron-jobs',
                credentials: "include"
            }),
            providesTags: result => result
            ? [
                ...result.map(({ id }) => ({ type: 'CronJobs' as const, id })),
                { type: 'CronJobs', id: 'LIST' }
            ]
            : [{ type: 'CronJobs', id: 'LIST' }]
        }),
        modifyCronJob: builder.mutation<CronJob, Partial<CronJob> & Pick<CronJob, 'id'>>({
            query: ({ id, ...body }) => ({
                url: `/admin/cron-jobs/${id}`,
                method: 'PATCH',
                credentials: "include",
                body
            }),
            invalidatesTags: [{ type: 'CronJobs', id: 'LIST' }]
        }),
        cancelNextCronJobInvocation: builder.mutation<void, CronJob['id']>({
            query: (id) => ({
                url: `/admin/cron-jobs/${id}/cancel-next`,
                method: 'POST',
                credentials: "include"
            }),
            invalidatesTags: [{ type: 'CronJobs', id: 'LIST' }]
        })
    })
})

export const {
    useGetCronJobsQuery,
    useModifyCronJobMutation,
    useCancelNextCronJobInvocationMutation
} = cronApi