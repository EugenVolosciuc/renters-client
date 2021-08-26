import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { User, LoginData } from 'types/User'

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/users`}),
    endpoints: builder => ({
        login: builder.mutation<User, LoginData>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                credentials: "include",
                body: { email, password }
            })
        }),
        checkAuth: builder.query<User, unknown>({
            query: () => ({ 
                url: '/me',
                credentials: "include"
            })
        })
    })
})

export const {
    useLoginMutation,
    useCheckAuthQuery
} = authApi