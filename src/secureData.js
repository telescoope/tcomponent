import { isArray, isObject, isUndefined, isNull } from 'lodash'

export default function secureData(data) {
  let d = new FormData()

  if (isObject(data)) {
    Object.keys(data).map((key, index) => {
      if (isArray(data[key])) {
        for (let i = 0; i < data[key].length; i++) {
          if (isObject(data[key][i])) {
            Object.keys(data[key][i]).map((k2, i2) => {
              if (!isUndefined(data[key][i][k2]) && !isNull(data[key][i][k2])) {
                d.append(key + '[' + i + '][' + k2 + ']', data[key][i][k2])
              }
            })
          } else {
            if (!isUndefined(data[key][i]) && !isNull(data[key][i])) {
              d.append(key + '[' + i + ']', data[key][i])
            }
          }
        }
      } else if (isObject(data[key])) {
        Object.keys(data[key]).map((k, i) => {
          if (!isUndefined(data[key][k]) && !isNull(data[key][k])) {
            d.append(key + '[' + k + ']', data[key][k])
          }
        })
      } else {
        if (!isUndefined(data[key]) && !isNull(data[key])) {
          d.append(key, data[key])
        }
      }
      return true
    })
  }

  return d
}
