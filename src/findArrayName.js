import { isUndefined, isNull } from 'lodash'

function findArrayName(name, data) {
  let val = null

  try {
    let check = name.split('[')

    let n = check[1].replace(']', '')

    let y = check[0]

    val = !isUndefined(data[y][n]) && !isNull(data[y][n]) ? data[y][n] : null
  } catch (e) {
    val = !isUndefined(data[name]) && !isNull(data[name]) ? data[name] : null
  }

  try {
    if (isNull(val)) {
      val = !isUndefined(data[name]) && !isNull(data[name]) ? data[name] : null
    }
  } catch (e) {}

  return val
}

export default findArrayName
