import { format, parse } from "date-fns";
import { DEFAULT_TIME_FORMAT_TOKEN } from "./TimeUtils";
import { DEFAULT_DATE_FORMAT_TOKEN } from "./DateUtils";

export const DEFAULT_DATETIME_FORMAT_TOKEN = `${DEFAULT_DATE_FORMAT_TOKEN} ${DEFAULT_TIME_FORMAT_TOKEN}`

export function getDay(date: Date | null) {
  return date?.getDate()
}
export function formatDateTime(date: Date | null) {
  return date === null ? '' : format(date, 'yyyy-MM-dd HH:mm:ss')
}
export function tryParseDateTimeFromString(dateString: string) {
  const result = parse(dateString, DEFAULT_DATETIME_FORMAT_TOKEN, new Date(0))
  if (isNaN(result.getTime())) throw new Error('date_string_parse_failed');
  return result
}
