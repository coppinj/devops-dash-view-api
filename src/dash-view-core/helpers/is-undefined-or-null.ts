export function isUndefinedOrNull<T>(x: T | null | undefined): x is null | undefined {
  return typeof x === 'undefined' || x === null;
}