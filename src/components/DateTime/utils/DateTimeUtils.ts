import { format, parse, set } from "date-fns";
import { DEFAULT_DATETIME_FORMAT_TOKEN } from "./DateTimeDefaults";

export function formatDateTime(date: Date | null) {
  return date === null ? '' : format(date, 'yyyy-MM-dd HH:mm:ss')
}
export function tryParseDateTimeFromString(dateString: string) {
  const result = parse(dateString, DEFAULT_DATETIME_FORMAT_TOKEN, getZeroDate())
  if (isNaN(result.getTime())) throw new Error('date_string_parse_failed');
  return result
}
export function getZeroDate() {
  return set(new Date(0), { hours: 0 })
}