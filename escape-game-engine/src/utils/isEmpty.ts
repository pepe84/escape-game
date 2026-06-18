export function isEmpty(value: any) {

  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(v => isEmpty(v));
  }

  return String(value).trim() === "";
}