import currency from 'currency.js'

export default function numberFormat(angka, prefix = '') {
  return currency(angka, {
    symbol: prefix + ' ',
    separator: '.',
    decimal: ',',
    precision: angka % 1 != 0 ? 2 : 0
  }).format()
}
