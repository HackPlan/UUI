import { clamp } from "lodash-es"

export function limitPrecision(value: string, precision?: number) {
  if (precision === undefined) return value
  const dotIndex = value.indexOf('.')
  if (dotIndex === -1) return value
  return value.slice(0, dotIndex + (precision === 0 ? 0 : 1 + precision))
}
export function limitRange(value: number, min?: number, max?: number) {
  return clamp(value, min === undefined ? Number.NEGATIVE_INFINITY : min, max === undefined ? Number.POSITIVE_INFINITY : max)
}

export type NumberAbbrUnit = 'k' | 'K' | 'm' | 'M' | 'b' | 'B';
export const NumberAbbrUnitValue = {
  'k': 1000,
  'K': 1000,
  'm': 1000_000,
  'M': 1000_000,
  'b': 1000_000_000,
  'B': 1000_000_000,
};
export function numberAbbr(value: number, unit: NumberAbbrUnit, maxPrecision = 2) {
  const precisionNumber = Math.pow(10, Math.round(clamp(maxPrecision, 0, Number.MAX_SAFE_INTEGER)))
  return Math.round(value / NumberAbbrUnitValue[unit] * precisionNumber) / precisionNumber
}