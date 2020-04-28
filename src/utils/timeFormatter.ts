import { DateTime } from "luxon"

export type TimeFormatterLocale =
  | 'zh-CN' | 'zh-TW'
  | 'en-US'

const formatHelper = (format: string) => (d: Date) => DateTime.fromJSDate(d).toFormat(format)

const chineseCapitalNumber = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chineseCapitalHourSecondHelper = (value: number) => {
  if (value < 10) return `〇${chineseCapitalNumber[value]}`
  else if (value === 10) return "十"
  else if (value > 10 && value < 20) return `十${chineseCapitalNumber[value-10]}`
  else if (value % 10 === 0) return `${chineseCapitalNumber[Math.floor(value / 10)]}十`
  else return `${chineseCapitalNumber[Math.floor(value / 10)]}十${chineseCapitalNumber[value%10]}`
}
const chineseAmPmHelper = (value: number) => {
  if (value <= 12) return "上午"
  else return "下午"
}

const timeFormatterConverter = {
  // Universal
  '13:30': formatHelper('hh:mm'),
  '1:30 PM': formatHelper('h:mm a'),
  '13:30:55': formatHelper('hh:mm:ss'),
  '1:30:55 PM': formatHelper('h:mm:ss a'),

  // Chinese
  '下午 1:30:55': (d: Date) => `${chineseAmPmHelper(d.getHours())} ${formatHelper('h:mm:ss')(d)}`,
  '13时30分': formatHelper('h时mm分'),
  '13时30分55秒': formatHelper('h时mm分ss秒'),
  '下午1时30分': (d: Date) => `${chineseAmPmHelper(d.getHours())}${formatHelper('h时mm分')(d)}`,
  '下午1时30分55秒': (d: Date) => `${chineseAmPmHelper(d.getHours())}${formatHelper('h时mm分ss秒')(d)}`,
  '十三时三十分': (d: Date) => `${chineseCapitalHourSecondHelper(d.getHours())}时${chineseCapitalHourSecondHelper(d.getMinutes())}分`,
  '下午一时三十分': (d: Date) => `${chineseAmPmHelper(d.getHours())}${chineseCapitalHourSecondHelper(d.getHours())}时${chineseCapitalHourSecondHelper(d.getMinutes())}分`,

  '13時30分': formatHelper('h時mm分'),
  '13時30分55秒': formatHelper('h時mm分ss秒'),
  '下午1時30分': (d: Date) => `${chineseAmPmHelper(d.getHours())}${formatHelper('h時mm分')(d)}`,
  '下午1時30分55秒': (d: Date) => `${chineseAmPmHelper(d.getHours())}${formatHelper('h時mm分ss秒')(d)}`,
  '十三時三十分': (d: Date) => `${chineseCapitalHourSecondHelper(d.getHours())}時${chineseCapitalHourSecondHelper(d.getMinutes())}分`,
  '下午一時三十分': (d: Date) => `${chineseAmPmHelper(d.getHours())}${chineseCapitalHourSecondHelper(d.getHours())}時${chineseCapitalHourSecondHelper(d.getMinutes())}分`,

  // English
}

type TimeFormatterKinds = keyof typeof timeFormatterConverter

type BaseTimeFormatterLocaleKinds = { [key in TimeFormatterLocale]: TimeFormatterKinds[] }
export interface TimeFormatterLocaleKinds extends BaseTimeFormatterLocaleKinds {
  'zh-CN': [
    "13:30",
    "1:30 PM",
    "13:30:55",
    "1:30:55 PM",
    "下午 1:30:55",
    "13时30分",
    "13时30分55秒",
    "下午1时30分",
    "下午1时30分55秒",
    "十三时三十分",
    "下午一时三十分",
  ];
  'zh-TW': [
    "13:30",
    "1:30 PM",
    "13:30:55",
    "1:30:55 PM",
    "下午 1:30:55",
    "13時30分",
    "13時30分55秒",
    "下午1時30分",
    "下午1時30分55秒",
    "十三時三十分",
    "下午一時三十分",
  ];
  'en-US': [
    "13:30",
    "1:30 PM",
    "13:30:55",
    "1:30:55 PM",
  ];
}

export function timeFormat<T extends TimeFormatterLocale>(date: Date, _locale: T, kind: TimeFormatterLocaleKinds[T][number]) {
  const converter = timeFormatterConverter[kind]
  return converter(date)
}
