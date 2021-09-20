import { baseApi } from 'store/baseApi'
import { Contract } from 'types/Contract'
import { PROPERTY_LABELS } from 'types/Property'
import { User, LoginFormData, SignupFormData } from 'types/User'

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation<User, Partial<User>>({
            query: (userData) => ({
                url: '/users',
                method: 'POST',
                body: userData
            })
        }),
        login: builder.mutation<User, LoginFormData>({
            query: ({ email, password }) => ({
                url: '/users/login',
                method: 'POST',
                credentials: "include",
                body: { email, password }
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
                credentials: "include"
            })
        }),
        checkAuth: builder.query<User, void>({
            query: () => ({
                url: '/users/me',
                credentials: "include"
            })
        }),
        modifyAuthedUser: builder.mutation<User, Partial<SignupFormData>>({
            query: (body) => ({
                url: '/users/me',
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
                url: '/users/renter-invite',
                method: 'POST',
                credentials: "include",
                body
            })
        }),
        getInvitationData: builder.query<{ contract: Contract, renterEmail: string, renterName: string }, string>({
            query: inviteId => ({
                url: `/users/invitation-data/${inviteId}`
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