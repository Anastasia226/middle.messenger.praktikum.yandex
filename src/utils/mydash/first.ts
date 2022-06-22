export function first<T>(list: T[]): T | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }
  return length ? list[0] : undefined;
}
