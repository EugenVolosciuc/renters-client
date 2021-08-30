export const removeProp = (prop: string | string[], obj: Record<string, any>) => {
    const clonedObj = Object.assign({}, obj)

    if (Array.isArray(prop)) {
        prop.forEach(el => { delete clonedObj[el] })
        return clonedObj
    } else {
        delete clonedObj[prop]
        return clonedObj
    }
}