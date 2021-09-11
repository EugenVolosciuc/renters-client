import { Property, PropertyFormData } from 'types/Property'
import { BILL_TYPES } from 'types/Bill'
import { Photo } from 'types/Photo'
import { handleError } from 'utils/handleError'

export const propertyFormDataToReqData = (formData: PropertyFormData): Partial<Property> => {
    const { title, description, rooms, address, floor, floors, floorArea, rentPrice, type, billTypes, jsonPhotos } = formData

    let photos: Photo[] | null = null

    try {
        photos = JSON.parse(jsonPhotos)
    } catch (error) {
        handleError(error)
    }

    return {
        title,
        description,
        rooms,
        address,
        floor,
        floors,
        floorArea,
        rentPrice,
        type,
        billTypes: !billTypes ? [BILL_TYPES.RENT] : Array.from(new Set([...(billTypes as BILL_TYPES[]), BILL_TYPES.RENT])),
        photos
    }
}