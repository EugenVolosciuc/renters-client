import { baseApi } from 'store/baseApi'
import { Contract, ContractDto } from 'types/Contract'
import { Property } from 'types/Property'
import { User } from 'types/User'

export const contractApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        createContract: builder.mutation<Contract, { propertyId: Property['id'], dueDate: number, startDate: Date, expirationDate: Date }>({
            query: data => ({
                url: `/contracts?propertyId=${data.propertyId}`,
                method: 'POST',
                credentials: "include",
                body: {
                    dueDate: data.dueDate,
                    startDate: data.startDate,
                    expirationDate: data.expirationDate
                }
            }),
            invalidatesTags: (_res, _err, data) => [{ type: 'Properties', id: data.propertyId }]
        }),
        modifyContract: builder.mutation<Contract, { contract: Partial<ContractDto>, contractId: Contract['id'], propertyId: Property['id'] }>({
            query: ({ contract, contractId }) => {
                return {
                    url: `/contracts/${contractId}`,
                    method: 'PATCH',
                    credentials: "include",
                    body: contract
                }
            },
            invalidatesTags: (_res, _err, { propertyId }) => [{ type: 'Properties', id: propertyId }]
        }),
        signContract: builder.mutation<Contract, { renter: User, contractId: Contract['id'] }>({
            query: ({ renter, contractId }) => ({
                url: `/contracts/${contractId}/sign`,
                method: 'PATCH',
                credentials: "include",
                body: renter
            })
        }),
        deleteContract: builder.mutation<void, { contractId: Contract['id'], propertyId: Property['id'] }>({
            query: ({ contractId }) => ({
                url: `/contracts/${contractId}`,
                method: 'DELETE',
                credentials: "include"
            }),
            invalidatesTags: (_res, _err, { propertyId }) => [{ type: 'Properties', id: propertyId }]
        })
    })
})

export const {
    useCreateContractMutation,
    useModifyContractMutation,
    useSignContractMutation,
    useDeleteContractMutation
} = contractApi