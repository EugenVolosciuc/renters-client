import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Contract } from 'types/Contract'
import { PROPERTY_LABELS } from 'types/Property'
import { User, LoginFormData, SignupFormData } from 'types/User'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/users` }),
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
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: "include"
            })
        }),
        checkAuth: builder.query<User, void>({
            query: () => ({
                url: '/me',
                credentials: "include"
            })
        }),
        modifyAuthedUser: builder.mutation<User, Partial<SignupFormData>>({
            query: (body) => ({
                url: '/me',
                method: 'PATCH',
                credentials: "include",
                body
            })
        }),
        sendSignupInvitationToRenter: builder.mutation<
            void,
            {
                renterEmail: string,
                renterName: string,
                propertyTitle: string,
                contractId: Contract['id'],
                propertyType: PROPERTY_LABELS
            }
        >({
            query: (body) => ({
                url: '/renter-invite',
                method: 'POST',
                credentials: "include",
                body
            })
        }),
        getInvitationData: builder.query<{ contract: Contract, renterEmail: string, renterName: string }, string>({
            query: inviteId => ({
                url: `/invitation-data/${inviteId}`
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useCheckAuthQuery,
    useModifyAuthedUserMutation,
    useSendSignupInvitationToRenterMutation,
    useGetInvitationDataQuery
} = authApi