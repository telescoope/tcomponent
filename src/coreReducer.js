import update from 'immutability-helper'

import slug from './slug'

export default function core(
  state = {
    message: '',
    message_title: '',
    message_tag: '',
    message_payload: {},
    loading: false,
    validation: {},
    input: {},
    parameter: {},
    filter: {},
    modal: {},
    status: null,
    media_device: null
  },
  action
) {
  let { key, value } = action.payload || {}
  let new_selected = {}
  let newval = {}
  let is_object = false
  let v = null
  let res = []
  let m = []

  key = slug(String(key), '_')

  switch (action.type) {
    case 'SET_MULTI_FILTER':
      newval = {
        ...state.filter,
        ...action.payload
      }
      return update(state, {
        filter: {
          $set: newval
        }
      })
      break
    case 'SET_FILTER':
      try {
        res = key.split('[')
        v = state.filter[res[0]]
        if (v) {
          is_object = true
        }
      } catch (e) {}

      try {
        m = key.match(/\[(\S+)\]/)

        if (is_object) {
          return update(state, {
            filter: {
              [res[0]]: {
                [String(m[1])]: {
                  $set: value
                }
              }
            }
          })
        } else {
          v = {
            [String(m[1])]: value
          }
          return update(state, {
            filter: {
              [res[0]]: {
                $set: v
              }
            }
          })
        }
      } catch (e) {
        return update(state, {
          filter: {
            [key]: {
              $set: value
            }
          }
        })
      }
      break

    case 'SET_MULTI_PARAMETER':
      newval = {
        ...state.parameter,
        ...action.payload
      }
      return update(state, {
        parameter: {
          $set: newval
        }
      })
      break

    case 'RESET_SELECTED':
      Object.keys(state.parameter).map((key, index) => {
        if (key.substr(0, 8) != 'selected') {
          new_selected[key] = state.parameter[key]
        }
      })

      return update(state, {
        parameter: {
          $set: new_selected
        }
      })
      break

    case 'SET_PARAMETER':
      is_object = false
      try {
        res = key.split('[')
        v = state.parameter[res[0]]
        if (v) {
          is_object = true
        }
      } catch (e) {}

      try {
        m = key.match(/\[(\S+)\]/)

        if (is_object) {
          return update(state, {
            parameter: {
              [res[0]]: {
                [String(m[1])]: {
                  $set: value
                }
              }
            }
          })
        } else {
          v = {
            [String(m[1])]: value
          }
          return update(state, {
            parameter: {
              [res[0]]: {
                $set: v
              }
            }
          })
        }
      } catch (e) {
        return update(state, {
          parameter: {
            [key]: {
              $set: value
            }
          }
        })
      }
      break
    case 'SET_MULTI_INPUT':
      newval = {
        ...state.input,
        ...action.payload
      }
      return update(state, {
        input: {
          $set: newval
        }
      })
      break
    case 'SET_INPUT':
      is_object = false
      v = {}
      try {
        res = key.split('[')
        v = state.input[res[0]]

        if (v) {
          is_object = true
        }
      } catch (e) {}

      try {
        m = key.match(/\[(\S+)\]/)
        if (is_object) {
          return update(state, {
            input: {
              [res[0]]: {
                [String(m[1])]: {
                  $set: value
                }
              }
            }
          })
        } else {
          v = {
            [String(m[1])]: value
          }
          return update(state, {
            input: {
              [res[0]]: {
                $set: v
              }
            }
          })
        }
      } catch (e) {
        return update(state, {
          input: {
            [key]: {
              $set: value
            }
          }
        })
      }
      break
    case 'SET_MESSAGE':
      return update(state, {
        message: {
          $set: action.payload
        }
      })
    case 'SET_MESSAGE_TITLE':
      return update(state, {
        message_title: {
          $set: action.payload
        }
      })
    case 'SET_MESSAGE_TAG':
      return update(state, {
        message_tag: {
          $set: action.payload
        }
      })
    case 'SET_MESSAGE_PAYLOAD':
      return update(state, {
        message_payload: {
          $set: action.payload
        }
      })
    case 'SET_MODAL':
      return update(state, {
        modal: {
          [key]: {
            $set: value
          }
        }
      })
    case 'SET_LOADING':
      return update(state, {
        loading: {
          $set: action.payload
        }
      })
    case 'RESET_VALIDATION_MESSAGE':
      return update(state, {
        message: {
          $set: ''
        },
        validation: {
          $set: {}
        }
      })
    case 'RESET_VALIDATION':
      return update(state, {
        loading: {
          $set: false
        },
        validation: {
          $set: {}
        }
      })
    case 'RESET_INPUT':
      return update(state, {
        input: {
          $set: {}
        }
      })
    case 'SET_MEDIA_DEVICE':
      return update(state, {
        media_device: {
          $set: action.payload
        }
      })
      break
    case 'RESET_PARAMETER':
      return update(state, {
        parameter: {
          $set: {}
        }
      })
      break
    case 'RESET_FILTER':
      return update(state, {
        filter: {
          $set: {}
        }
      })
      break
    case 'SET_STATUS':
      return update(state, {
        status: {
          $set: action.payload
        }
      })
    case 'SET_VALIDATION':
      return update(state, {
        validation: {
          $set: action.payload
        }
      })
    default:
      return state
  }
}
