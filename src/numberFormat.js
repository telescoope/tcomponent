import currency from 'currency.js'

export default function numberFormat(angka, prefix = '') {
  return currency(Number(angka), {
    symbol: prefix + ' ',
    separator: '.',
    decimal: ',',
    precision: Number(angka) % 1 != 0 ? 2 : 0
  }).format()
}
