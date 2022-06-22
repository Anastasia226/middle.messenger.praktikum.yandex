type StringIndexed = Record<string, unknown>;

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isObject(value: unknown): value is PlainObject {
  return Object.prototype === Object.getPrototypeOf(value);
}

function stringifyObject(obj2: PlainObject | unknown[]): string[] {
  return Object.entries(obj2).reduce((acc, [id, value]) => {
    if (Array.isArray(value) || isObject(value)) {
      return acc.concat([stringifyObject(value).map((item) => `[${id}]${item}`) as never]);
    }
    return acc.concat(`[${id}]=${value}` as never);
  }, []);
}

const flatSingle = (arr: any) => [].concat(...arr);
export const queryStringify = (data: StringIndexed): string | never => {
  if (!isObject(data)) {
    throw new Error('input must be an object');
  }

  const arr = Object.entries(data)
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value) || isObject(value)) {
        return acc.concat([stringifyObject(value).map((item) => `${key}${item}`) as never]);
      }

      return acc.concat([`${key}=${value}` as never]);
    }, []);
  return flatSingle(arr).join('&');
};
