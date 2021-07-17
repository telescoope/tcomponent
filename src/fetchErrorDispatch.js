import { isEqual } from 'lodash'

export default function fetchErrorDispatch(error, dispatch, prefix = '') {
  prefix = String(prefix).toUpperCase()

  if (prefix != 'NULL') {
    if (!isEqual(prefix, 'EXTRANET')) {
      dispatch({
        type: 'SET_LOADING_' + prefix,
        payload: false
      })
    }

    if (error.response) {
      if (!isEqual(prefix, 'EXTRANET')) {
        dispatch({
          type: 'SET_STATUS_' + prefix,
          payload: error.response.status
        })
      }

      dispatch({
        type: 'SET_STATUS',
        payload: error.response.status
      })

      if (error.response.status == 422) {
        dispatch({
          type: 'SET_VALIDATION',
          payload: error.response.data
        })
      }

      try {
        if (error.response.data.message) {
          dispatch({
            type: 'SET_MESSAGE',
            payload: error.response.data.message
          })
        }
      } catch (e) {}

      try {
        if (error.response.data.data) {
          dispatch({
            type: 'SET_MESSAGE_PAYLOAD',
            payload: error.response.data.data
          })
        }
      } catch (e) {}

      try {
        if (error.response.data.error == 'invalid_grant') {
          dispatch({
            type: 'SET_MESSAGE',
            payload: 'Email / Password salah'
          })
        }
      } catch (e) {}

      try {
        if (error.response.data.logout) {
          dispatch({
            type: 'DO_LOGOUT',
            payload: true
          })
        }
      } catch (e) {}
    } else if (error.request) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Terjadi kesalahan, silahkan dicoba kembali'
      })
    }
  }
}
