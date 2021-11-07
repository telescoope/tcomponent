import currency from 'currency.js'

export default function numberFormat(angka, prefix = '') {
  angka = !isNaN(Number(angka)) ? Number(angka) : 0
  return currency(angka, {
    symbol: prefix + ' ',
    separator: '.',
    decimal: ',',
    precision: angka % 1 != 0 ? 2 : 0
  }).format()
}
