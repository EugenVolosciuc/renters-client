import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Photo } from 'types/Photo'

export const photoApi = createApi({
    reducerPath: 'photoApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/photos` }),
    endpoints: builder => ({
        upload: builder.mutation<Photo, FormData>({
            query: (photoData) => ({
                url: '/',
                method: 'POST',
                credentials: "include",
                body: photoData
            })
        }),
        delete: builder.mutation<void, Pick<Photo, 'public_id'>>({
            query: ({ public_id }) => ({
                url: `/${public_id}`,
                method: 'DELETE',
                credentials: "include"
            })
        })
    })
})

export const {
    useUploadMutation,
    useDeleteMutation
} = photoApi