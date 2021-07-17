import update from 'immutability-helper'

export default function auth(
  state = {
    role: '',
    user: {},
    token: '',
    forgot_password: {},
    loading: false
  },
  action
) {
  switch (action.type) {
    case 'DO_LOGIN':
      return update(state, {
        user: {
          $set: action.payload
        }
      })
      break
    case 'SET_LOADING_AUTH':
      return update(state, {
        loading: {
          $set: action.payload
        }
      })
      break
    case 'OAUTH_LOGIN':
      return update(state, {
        token: {
          $set: action.payload
        }
      })
      break
    case 'SET_ROLE':
      return update(state, {
        user: {
          $set: { ...state.user, role: action.payload }
        }
      })
      break
    case 'DO_FORGOT_PASSWORD':
      return update(state, {
        forgot_password: {
          $set: action.payload
        }
      })
      break
    case 'DO_LOGOUT':
      return update(state, {
        user: {
          $set: {}
        },
        token: {
          $set: null
        }
      })
      break
    default:
      return state
      break
  }
}
