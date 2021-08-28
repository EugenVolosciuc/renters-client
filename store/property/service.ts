import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Property } from 'types/Property'

export const propertyApi = createApi({
    reducerPath: 'propertyApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/properties` }),
    endpoints: builder => ({
        create: builder.mutation<Property, Partial<Property>>({
            query: property => ({
                url: '/',
                method: 'POST',
                credentials: "include",
                body: property
            })
        }),
        getProperties: builder.query<Property[], any>({ // TODO: Property[] is wrong, should be pagination object
            query: () => ({ url: '/' })
        })
    })
})

export const {
    useCreateMutation,
    useGetPropertiesQuery
} = propertyApi