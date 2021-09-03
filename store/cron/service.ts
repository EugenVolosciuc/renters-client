import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'

import { CronJob } from 'types/CronJob'

export const cronApi = createApi({
    reducerPath: 'cronApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/admin/cron-jobs`}),
    tagTypes: ['CronJobs'],
    endpoints: builder => ({
        getCronJobs: builder.query<CronJob[], void>({
            query: () => ({
                url: '/',
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
                url: `/${id}`,
                method: 'PATCH',
                credentials: "include",
                body
            }),
            invalidatesTags: [{ type: 'CronJobs', id: 'LIST' }]
        }),
        cancelNextCronJobInvocation: builder.mutation<void, CronJob['id']>({
            query: (id) => ({
                url: `/${id}/cancel-next`,
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