export const removeProp = (prop: string, obj: Record<string, any>) => {
    const { [prop]: _, ...withoutProp } = obj
    return withoutProp
}