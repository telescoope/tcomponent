import slug from './slug'

import { isNull, isUndefined, uniq } from 'lodash'

export default function defaultFilterData(data, columns, name) {
  let page = 1

  let load = 10

  let keyword = ''

  let sorted = []

  let search = {}

  try {
    page = data[slug('page_' + name, '_')]

    load = data[slug('load_' + name, '_')]

    keyword = data[slug('keyword_' + name, '_')]
  } catch (e) {}

  Object.keys(data).map((key, index) => {
    let search_key = slug('search_' + name + '_', '_')
    let sort_key = slug('sort_' + name + '_', '_')
    if (
      key.toLowerCase().substring(0, search_key.length) ==
      search_key.toLowerCase()
    ) {
      columns.push(key.replace(search_key + '_', ''))
    }
    if (
      key.toLowerCase().substring(0, sort_key.length) == sort_key.toLowerCase()
    ) {
      columns.push(key.replace(sort_key + '_', ''))
    }
  })

  columns = uniq(columns)

  for (let i = 0; i < columns.length; i++) {
    let kolom = columns[i] || ''

    try {
      let key = slug('search_' + name + '_' + kolom, '_')

      let cari = data[key]

      if (!isNull(cari) && !isUndefined(cari)) {
        search[kolom] = cari
      }
    } catch (e) {}

    try {
      let key = slug('sort_' + name + '_' + kolom, '_')

      let urut = data[key]

      if (!isNull(urut) && !isUndefined(urut)) {
        sorted.push({
          id: kolom,
          desc: urut == 'desc'
        })
      }
    } catch (e) {}
  }

  let isi = {
    page: page || 1,
    load: load || 10,
    keyword: keyword || '',
    sorted: sorted || [],
    search: search || {}
  }

  return isi
}
