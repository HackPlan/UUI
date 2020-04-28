import { DateTime } from "luxon"

export type DateFormatterLocale =
  | 'zh-CN' | 'zh-TW'
  | 'en-US'



const formatHelper = (format: string) => (d: Date) => DateTime.fromJSDate(d).toFormat(format)
const chineseWeekHelper1 = (weekday: number) => {
  switch(weekday) {
    case 1: return "星期一"
    case 2: return "星期二"
    case 3: return "星期三"
    case 4: return "星期四"
    case 5: return "星期五"
    case 6: return "星期六"
    case 7: return "星期天"
  }
}
const chineseWeekHelper2 = (weekday: number, tc?: boolean) => {
  switch(weekday) {
    case 1: return tc ? "週一" : "周一"
    case 2: return tc ? "週二" : "周二"
    case 3: return tc ? "週三" : "周三"
    case 4: return tc ? "週四" : "周四"
    case 5: return tc ? "週五" : "周五"
    case 6: return tc ? "週六" : "周六"
    case 7: return tc ? "週天" : "周天"
  }
}
const chineseCapitalNumber = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chineseCapitalYearHelper = (value: number) => {
  return value.toString().split('').map((i) => chineseCapitalNumber[parseInt(i, 10)]).join('')
}
const chineseCapitalMonthOrDayHelper = (value: number) => {
  if (value < 10) return chineseCapitalNumber[value]
  else if (value === 10) return "十"
  else if (value > 10 && value < 20) return `十${chineseCapitalNumber[value-10]}`
  else if (value % 10 === 0) return `${chineseCapitalNumber[Math.floor(value / 10)]}十`
  else return `${chineseCapitalNumber[Math.floor(value / 10)]}十${chineseCapitalNumber[value%10]}`
}

const dateFormatterConverter = {
  // Universal
  '2012/3/14': formatHelper('yyyy/L/dd'),
  '2012-03-14': formatHelper('yyyy-LL-dd'),
  '12/3/14': formatHelper('yy/L/dd'),
  '3/14': formatHelper('L/dd'),
  '3/14/12': formatHelper('L/dd/yy'),
  '03/14/12': formatHelper('LL/dd/yy'),

  // Chinese
  '2012年3月14日 星期三': (d: Date) => {
    return `${formatHelper('yyyy年L月dd日')(d)} ${chineseWeekHelper1(d.getDay())}`
  },
  '2012年3月14日': formatHelper('yyyy年L月dd日'),
  '2012年3月': formatHelper('yyyy年L月'),
  '3月14日': formatHelper('L月dd日'),
  '二○一二年三月十四日': (d: Date) => `${chineseCapitalYearHelper(d.getFullYear())}年${chineseCapitalMonthOrDayHelper(d.getMonth()+1)}月${chineseCapitalMonthOrDayHelper(d.getDate())}日`,
  '二○一二年三月': (d: Date) => `${chineseCapitalYearHelper(d.getFullYear())}年${chineseCapitalMonthOrDayHelper(d.getMonth()+1)}月`,
  '三月十四日': (d: Date) => `${chineseCapitalMonthOrDayHelper(d.getMonth()+1)}月${chineseCapitalMonthOrDayHelper(d.getDate())}日`,
  '星期三': (d: Date) => chineseWeekHelper1(d.getDay()),
  '周三': (d: Date) => chineseWeekHelper2(d.getDay()),
  '週三': (d: Date) => chineseWeekHelper2(d.getDay(), true),

  // English
  '14-Mar-12': formatHelper('dd-LLL-yy'),
  'Mar-12': formatHelper('LLL-yy'),
  'March-12': formatHelper('LLLL-yy'),
  'March 14, 2012': formatHelper('LLLL dd, yyyy'),
  '14-Mar-2012': formatHelper('dd-LLL-yyyy'),
}

type DateFormatterKinds = keyof typeof dateFormatterConverter

type BaseDateFormatterLocaleKinds = { [key in DateFormatterLocale]: DateFormatterKinds[] }
export interface DateFormatterLocaleKinds extends BaseDateFormatterLocaleKinds {
  'zh-CN': [
    "2012/3/14",
    "2012-03-14",
    "二○一二年三月十四日",
    "二○一二年三月",
    "三月十四日",
    "2012年3月14日",
    "2012年3月",
    "3月14日",
    "星期三",
    "周三",
  ];
  'zh-TW': [
    "2012-03-14",
    "2012年3月14日",
    "2012年3月",
    "3月14日",
    "二○一二年三月十四日",
    "二○一二年三月",
    "三月十四日",
    "星期三",
    "週三",
  ];
  'en-US': [
    "2012/3/14",
    "2012-03-14",
    "12/3/14",
    "3/14",
    "3/14/12",
    "03/14/12",
    "14-Mar-12",
    "Mar-12",
    "March-12",
    "March 14, 2012",
    "14-Mar-2012",
  ];
}

export function dateFormat<T extends DateFormatterLocale>(date: Date, _locale: T, kind: DateFormatterLocaleKinds[T][number]) {
  const converter = dateFormatterConverter[kind]
  return converter(date)
}
