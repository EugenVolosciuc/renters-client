import { handleError } from "utils/handleError"

export const capitalize = (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1)

export const parseDBArray = (dbArray: string): string[] => {
    try {
        let stringArray = dbArray.replace("{", "[")
        stringArray = stringArray.replace("}", "]")
    
        const arr = JSON.parse(stringArray)

        return arr
    } catch (error) {
        handleError(error)
    }

    return []
}