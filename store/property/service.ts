import { baseApi } from 'store/baseApi'
import { Property, PaginatedProperties, PropertyQueryOptions } from 'types/Property'
import { removeProp } from 'utils/removeProp'
import { serializePagination } from 'utils/serializePagination'

export const propertyApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getProperties: builder.query<PaginatedProperties, PropertyQueryOptions>({
            query: (params) => {
                const filteredParams = params.type === "ALL"
                    ? removeProp('type', params)
                    : params

                const serializedParams = serializePagination(filteredParams)

                return {
                    url: '/properties',
                    params: serializedParams,
                    credentials: "include",
                }
            },
            providesTags: result => result
                ? [
                    ...result.data.map(({ id }) => ({ type: 'Properties' as const, id, })),
                    { type: 'Properties', id: 'LIST' }
                ]
                : [{ type: 'Properties', id: 'LIST' }]
        }),
        getProperty: builder.query<Property, number>({
            query: (id) => ({
                url: `/properties/${id}`,
                credentials: "include"
            }),
            providesTags: (_result, _error, id) => [{ type: 'Properties', id }]
        }),
        createProperty: builder.mutation<Property, Partial<Property>>({
            query: property => ({
                url: '/properties',
                method: 'POST',
                credentials: "include",
                body: property
            }),
            invalidatesTags: [{ type: 'Properties', id: 'LIST' }]
        }),
        modifyProperty: builder.mutation<Property, { property: Partial<Property>, id: Property['id'] }>({
            query: ({ property, id }) => ({
                url: `/properties/${id}`,
                method: 'PATCH',
                credentials: "include",
                body: property
            }),
            invalidatesTags: ['Properties']
        })
    })
})

export const {
    useCreatePropertyMutation,
    useModifyPropertyMutation,
    useGetPropertiesQuery,
    useGetPropertyQuery
} = propertyApi