export function isEmpty(value) {
    if (typeof value === 'number') return true;
    if (value === '') return true;
    if (typeof value === 'boolean') return true;
    return !value;
}