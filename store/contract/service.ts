import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Contract, ContractDto } from 'types/Contract'
import { Property } from 'types/Property'
import { User } from 'types/User'

export const contractApi = createApi({
    reducerPath: 'contractApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/contracts` }),
    tagTypes: ['Contracts', 'Properties'],
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
            }),
            invalidatesTags: (_res, _err, data) => [{ type: 'Properties', id: data.propertyId }, 'Contracts', 'Properties']
        }),
        modifyContract: builder.mutation<Contract, { contract: Partial<ContractDto>, contractId: Contract['id'], propertyId: Property['id'] }>({
            query: ({ contract, contractId }) => {
                return {
                    url: `/${contractId}`,
                    method: 'PATCH',
                    credentials: "include",
                    body: contract
                }
            },
            invalidatesTags: (_res, _err, { propertyId }) => ['Properties', 'Contracts', { type: 'Properties', id: propertyId }]
        }),
        signContract: builder.mutation<Contract, { renter: User, id: Contract['id'] }>({
            query: ({ renter, id }) => ({
                url: `/${id}/sign`,
                method: 'PATCH',
                credentials: "include",
                body: renter
            })
        }),
        deleteContract: builder.mutation<void, Contract['id']>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: "include"
            })
        })
    })
})

export const {
    useCreateContractMutation,
    useModifyContractMutation,
    useSignContractMutation,
    useDeleteContractMutation
} = contractApi