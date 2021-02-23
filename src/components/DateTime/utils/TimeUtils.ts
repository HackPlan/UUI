import { parse, format } from "date-fns"
import { getZeroDate } from "./DateTimeUtils"
import { DEFAULT_TIME_FORMAT_TOKEN } from "./DateTimeDefaults"


export function formatTime(date: Date | null) {
  if (date === null) return ''
  return format(date, DEFAULT_TIME_FORMAT_TOKEN)
}
export function tryParseTimeFromString(dateString: string) {
  const result = parse(dateString, DEFAULT_TIME_FORMAT_TOKEN, getZeroDate())
  if (isNaN(result.getTime())) throw new Error('time_string_parse_failed');
  return result
}