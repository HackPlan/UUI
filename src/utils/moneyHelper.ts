export function formatMoney(value: number, options?: {
  symbol?: string;
  precision?: number;
  thousand?: string;
  decimal?: string;
}) {
  const finalOptions = {
    symbol: options?.symbol || '$',
    thousand: options?.thousand || ',',
    decimal: options?.decimal || '.',
    precision: options?.precision || 2,
  }
  const regex = `\\d(?=(\\d{${3}})+${finalOptions.precision > 0 ? '\\D' : '$'})`
  let result = value.toFixed(Math.max(0, ~~finalOptions.precision))
  result = finalOptions.decimal ? result.replace('.', finalOptions.decimal) : result
  result = result.replace(new RegExp(regex, 'g'), `$&${finalOptions.thousand}`)
  result = `${finalOptions.symbol} ${result}`
  return result
}