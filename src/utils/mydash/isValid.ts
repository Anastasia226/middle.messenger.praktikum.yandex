export const isValid = (value: string, regex: RegExp) => {
    return regex.test(value)
}