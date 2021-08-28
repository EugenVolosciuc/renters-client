import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { User, LoginFormData } from 'types/User'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/users`}),
    endpoints: builder => ({
        signup: builder.mutation<User, Partial<User>>({
            query: (userData) => ({
                url: '/',
                method: 'POST',
                body: userData
            })
        }),
        login: builder.mutation<User, LoginFormData>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                credentials: "include",
                body: { email, password }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: "include"
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
    useLogoutMutation,
    useSignupMutation,
    useCheckAuthQuery
} = authApi