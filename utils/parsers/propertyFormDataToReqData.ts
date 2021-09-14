import { Property, PropertyFormData, PROPERTY_TYPES } from 'types/Property'
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

    const shouldAddFloor = type !== PROPERTY_TYPES.HOUSE

    return {
        title,
        description,
        rooms,
        address,
        floors,
        floorArea,
        rentPrice,
        type,
        photos,
        ...(shouldAddFloor && { floor }),
        billTypes: !billTypes ? [BILL_TYPES.RENT] : Array.from(new Set([...(billTypes as BILL_TYPES[]), BILL_TYPES.RENT])),
    }
}