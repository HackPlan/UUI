import { parse, format, set } from "date-fns"
import { TimeSelectValue } from "./TimeSelect"

export const DEFAULT_FORMAT_TOKEN = "HH:mm:ss"

export function getTimeValue(date: Date | null): TimeSelectValue {
  return {
    hour: date?.getHours() || 0,
    minute: date?.getMinutes() || 0,
    second: date?.getSeconds() || 0,
  }
}
export function formatTimeFromDate(date: Date | null) {
  if (date === null) return ''
  return format(date, DEFAULT_FORMAT_TOKEN)
}
export function getDateFromTimeValue(time: TimeSelectValue) {
  return set(new Date(0), { hours: time.hour, minutes: time.minute, seconds: time.second })
}
export function formatTimeValue(time: TimeSelectValue | null) {
  if (time === null) return ''
  const date = getDateFromTimeValue(time)
  return formatTimeFromDate(date)
}
export function tryParseTimeFromString(dateString: string) {
  const result = parse(dateString, DEFAULT_FORMAT_TOKEN, new Date(0))
  if (isNaN(result.getTime())) throw new Error('time_string_parse_failed');
  return result
}