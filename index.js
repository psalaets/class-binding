const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
const isString = value => typeof value === 'string';

export function evaluate(value) {
  if (isObject(value)) {
    return evalObject(value);
  }

  if (Array.isArray(value)) {
    return value
      .reduce((array, value) => {
        if (isObject(value)) {
          array.push(...evalObject(value));
        } else {
          array.push(value);
        }
        return array;
      }, [])
      .filter(isNotEmpty);
  }

  return [String(value)];
}

function evalObject(value) {
  return Object.keys(value).reduce((array, key) => {
    if (value[key]) {
      array.push(key);
    }
    return array;
  }, []);
}

function isNotEmpty(value) {
  return !!value;
}