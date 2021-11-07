import currency from 'currency.js'

export default function numberFormat(angka, prefix = '') {
  return currency(angka, {
    symbol: prefix + ' ',
    separator: '.',
    decimal: ',',
    precision: 2
  }).format()
}
