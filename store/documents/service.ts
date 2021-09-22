
import { baseApi } from 'store/baseApi'
import { Document } from 'types/Document'

export const documentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        uploadDocument: builder.mutation<Document, FormData>({
            query: (documentData) => ({
                url: '/documents',
                method: 'POST',
                credentials: "include",
                body: documentData
            })
        }),
        deleteDocument: builder.mutation<void, Document['public_id']>({
            query: (public_id) => ({
                url: `/documents/${public_id}`,
                method: 'DELETE',
                credentials: "include"
            })
        })
    })
})

export const {
    useUploadDocumentMutation,
    useDeleteDocumentMutation
} = documentApi