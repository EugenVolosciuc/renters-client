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
        createContract: builder.mutation<Contract, { propertyId: Property['id'], dueDate: number, expirationDate: Date }>({
            query: data => ({
                url: `/?propertyId=${data.propertyId}`,
                method: 'POST',
                credentials: "include",
                body: {
                    dueDate: data.dueDate,
                    expirationDate: data.expirationDate
                }
            })
        })
    })
})

export const {
    useCreateContractMutation
} = contractApi