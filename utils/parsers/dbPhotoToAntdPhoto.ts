import { Photo } from "types/Photo"

export const dbPhotoToAntdPhoto = (photo: Photo) => {
    return {
        uid: photo.public_id,
        name: photo.title,
        status: 'done',
        thumbUrl: photo.url
    }
}