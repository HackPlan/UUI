import { clamp } from "lodash"

export function limitPrecision(value: string, precision?: number) {
  if (precision === undefined) return value
  const dotIndex = value.indexOf('.')
  if (dotIndex === -1) return value
  return value.slice(0, dotIndex + (precision === 0 ? 0 : 1 + precision))
}
export function limitRange(value: number, min?: number, max?: number) {
  return clamp(value, min || Number.NEGATIVE_INFINITY, max || Number.POSITIVE_INFINITY)
}
