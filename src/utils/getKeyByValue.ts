export function getKeyByValue<T extends { [index: string]: string }>(
  enumObj: T,
  value: string,
): keyof T | null {
  for (const key in enumObj) {
    if (enumObj[key] === value) {
      return key;
    }
  }
  return null;
}
