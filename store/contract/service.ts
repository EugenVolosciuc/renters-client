import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Contract } from 'types/Contract'
import { Property } from 'types/Property'
import { User } from 'types/User'

export const contractApi = createApi({
    reducerPath: 'contractApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/contracts` }),
    tagTypes: ['Contracts'],
    endpoints: builder => ({
        createContract: builder.mutation<Contract, { propertyId: Property['id'], dueDate: number, startDate: Date, expirationDate: Date }>({
            query: data => ({
                url: `/?propertyId=${data.propertyId}`,
                method: 'POST',
                credentials: "include",
                body: {
                    dueDate: data.dueDate,
                    startDate: data.startDate,
                    expirationDate: data.expirationDate
                }
            })
        }),
        modifyContract: builder.mutation<Contract, { contract: Partial<Contract>, id: Contract['id'] }>({
            query: ({ contract, id }) => ({
                url: `/${id}`,
                method: 'PATCH',
                credentials: "include",
                body: contract
            })
        }),
        signContract: builder.mutation<Contract, { renter: User, id: Contract['id'] }>({
            query: ({ renter, id }) => ({
                url: `/${id}/sign`,
                method: 'PATCH',
                credentials: "include",
                body: renter
            })
        })
    })
})

export const {
    useCreateContractMutation,
    useModifyContractMutation,
    useSignContractMutation
} = contractApi