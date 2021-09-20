
import { baseApi } from 'store/baseApi'
import { API_BASE_URL } from 'constants/API_BASE_URL'
import { Photo } from 'types/Photo'

export const photoApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        upload: builder.mutation<Photo, FormData>({
            query: (photoData) => ({
                url: '/photos',
                method: 'POST',
                credentials: "include",
                body: photoData
            })
        }),
        delete: builder.mutation<void, Photo['public_id']>({
            query: (public_id) => ({
                url: `/photos/${public_id}`,
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