import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Property, PaginatedProperties } from 'types/Property'
import { PaginationOptions } from 'types/misc'

export const propertyApi = createApi({
    reducerPath: 'propertyApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/properties` }),
    tagTypes: ['Properties'],
    endpoints: builder => ({
        getProperties: builder.query<PaginatedProperties, PaginationOptions>({
            query: () => ({
                url: '/',
                credentials: "include",
            }),
            providesTags: result => result
                ? [
                    ...result.data.map(({ id }) => ({ type: 'Properties' as const, id })),
                    { type: 'Properties', id: 'LIST' }
                ]
                : [{ type: 'Properties', id: 'LIST' }]
        }),
        create: builder.mutation<Property, Partial<Property>>({
            query: property => ({
                url: '/',
                method: 'POST',
                credentials: "include",
                body: property
            }),
            invalidatesTags: [{ type: 'Properties', id: 'LIST' }]
        })
    })
})

export const {
    useCreateMutation,
    useGetPropertiesQuery
} = propertyApi