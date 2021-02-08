export function getYearMonth(date: Date | null) {
  return {
    year: (date || new Date()).getFullYear(),
    month: (date || new Date()).getMonth()+1,
  }
}