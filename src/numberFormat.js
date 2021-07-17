export default function numberFormat(angka, prefix = '') {
  let isMin = String(angka).substr(0, 1) == '-'
  let number_string = String(angka)
    .replace(/[^,\d]/g, '')
    .toString()
  let split = number_string.split(',')
  let sisa = split[0].length % 3
  let rupiah = split[0].substr(0, sisa)
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi)

  if (ribuan) {
    let separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  prefix = isMin ? '-' + prefix : prefix

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
  return rupiah ? prefix + rupiah : prefix + '0'
}
