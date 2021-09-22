
import { baseApi } from 'store/baseApi'
import { Photo } from 'types/Photo'

export const photoApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        uploadPhoto: builder.mutation<Photo, FormData>({
            query: (photoData) => ({
                url: '/photos',
                method: 'POST',
                credentials: "include",
                body: photoData
            })
        }),
        deletePhoto: builder.mutation<void, Photo['public_id']>({
            query: (public_id) => ({
                url: `/photos/${public_id}`,
                method: 'DELETE',
                credentials: "include"
            })
        })
    })
})

export const {
    useUploadPhotoMutation,
    useDeletePhotoMutation
} = photoApi