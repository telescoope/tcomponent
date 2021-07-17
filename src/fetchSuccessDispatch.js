import { isEqual } from 'lodash'

export default function fetchSuccessDispatch(response, dispatch, prefix = '') {
  prefix = String(prefix).toUpperCase()

  if (prefix != 'NULL') {
    if (!isEqual(prefix, 'EXTRANET')) {
      dispatch({
        type: 'SET_STATUS_' + prefix,
        payload: response.status
      })

      dispatch({
        type: 'SET_LOADING_' + prefix,
        payload: false
      })
    }
  }
}
