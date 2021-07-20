import update from 'immutability-helper';
import slugify from 'slugify';
import { isUndefined, isNull, isEqual, isObject, isArray, uniq } from 'lodash';
import { useCallback, useEffect } from 'react';

function slug(data, separator = '_') {
  return slugify(String(data), {
    replacement: separator,
    remove: /[*+~.()'"!:@]/g,
    lower: false
  });
}

function core(state = {
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
}, action) {
  let {
    key,
    value
  } = action.payload || {};
  let new_selected = {};
  let newval = {};
  let is_object = false;
  let v = null;
  let res = [];
  let m = [];
  key = slug(String(key), '_');

  switch (action.type) {
    case 'SET_MULTI_FILTER':
      newval = { ...state.filter,
        ...action.payload
      };
      return update(state, {
        filter: {
          $set: newval
        }
      });

    case 'SET_FILTER':
      try {
        res = key.split('[');
        v = state.filter[res[0]];

        if (v) {
          is_object = true;
        }
      } catch (e) {}

      try {
        m = key.match(/\[(\S+)\]/);

        if (is_object) {
          return update(state, {
            filter: {
              [res[0]]: {
                [String(m[1])]: {
                  $set: value
                }
              }
            }
          });
        } else {
          v = {
            [String(m[1])]: value
          };
          return update(state, {
            filter: {
              [res[0]]: {
                $set: v
              }
            }
          });
        }
      } catch (e) {
        return update(state, {
          filter: {
            [key]: {
              $set: value
            }
          }
        });
      }

      break;

    case 'SET_MULTI_PARAMETER':
      newval = { ...state.parameter,
        ...action.payload
      };
      return update(state, {
        parameter: {
          $set: newval
        }
      });

    case 'RESET_SELECTED':
      Object.keys(state.parameter).map((key, index) => {
        if (key.substr(0, 8) != 'selected') {
          new_selected[key] = state.parameter[key];
        }
      });
      return update(state, {
        parameter: {
          $set: new_selected
        }
      });

    case 'SET_PARAMETER':
      is_object = false;

      try {
        res = key.split('[');
        v = state.parameter[res[0]];

        if (v) {
          is_object = true;
        }
      } catch (e) {}

      try {
        m = key.match(/\[(\S+)\]/);

        if (is_object) {
          return update(state, {
            parameter: {
              [res[0]]: {
                [String(m[1])]: {
                  $set: value
                }
              }
            }
          });
        } else {
          v = {
            [String(m[1])]: value
          };
          return update(state, {
            parameter: {
              [res[0]]: {
                $set: v
              }
            }
          });
        }
      } catch (e) {
        return update(state, {
          parameter: {
            [key]: {
              $set: value
            }
          }
        });
      }

      break;

    case 'SET_MULTI_INPUT':
      newval = { ...state.input,
        ...action.payload
      };
      return update(state, {
        input: {
          $set: newval
        }
      });

    case 'SET_INPUT':
      is_object = false;
      v = {};

      try {
        res = key.split('[');
        v = state.input[res[0]];

        if (v) {
          is_object = true;
        }
      } catch (e) {}

      try {
        m = key.match(/\[(\S+)\]/);

        if (is_object) {
          return update(state, {
            input: {
              [res[0]]: {
                [String(m[1])]: {
                  $set: value
                }
              }
            }
          });
        } else {
          v = {
            [String(m[1])]: value
          };
          return update(state, {
            input: {
              [res[0]]: {
                $set: v
              }
            }
          });
        }
      } catch (e) {
        return update(state, {
          input: {
            [key]: {
              $set: value
            }
          }
        });
      }

      break;

    case 'SET_MESSAGE':
      return update(state, {
        message: {
          $set: action.payload
        }
      });

    case 'SET_MESSAGE_TITLE':
      return update(state, {
        message_title: {
          $set: action.payload
        }
      });

    case 'SET_MESSAGE_TAG':
      return update(state, {
        message_tag: {
          $set: action.payload
        }
      });

    case 'SET_MESSAGE_PAYLOAD':
      return update(state, {
        message_payload: {
          $set: action.payload
        }
      });

    case 'SET_MODAL':
      return update(state, {
        modal: {
          [key]: {
            $set: value
          }
        }
      });

    case 'SET_LOADING':
      return update(state, {
        loading: {
          $set: action.payload
        }
      });

    case 'RESET_VALIDATION_MESSAGE':
      return update(state, {
        message: {
          $set: ''
        },
        validation: {
          $set: {}
        }
      });

    case 'RESET_VALIDATION':
      return update(state, {
        loading: {
          $set: false
        },
        validation: {
          $set: {}
        }
      });

    case 'RESET_INPUT':
      return update(state, {
        input: {
          $set: {}
        }
      });

    case 'SET_MEDIA_DEVICE':
      return update(state, {
        media_device: {
          $set: action.payload
        }
      });

    case 'RESET_PARAMETER':
      return update(state, {
        parameter: {
          $set: {}
        }
      });

    case 'RESET_FILTER':
      return update(state, {
        filter: {
          $set: {}
        }
      });

    case 'SET_STATUS':
      return update(state, {
        status: {
          $set: action.payload
        }
      });

    case 'SET_VALIDATION':
      return update(state, {
        validation: {
          $set: action.payload
        }
      });

    default:
      return state;
  }
}

function auth(state = {
  role: '',
  user: {},
  token: '',
  forgot_password: {},
  loading: false
}, action) {
  switch (action.type) {
    case 'DO_LOGIN':
      return update(state, {
        user: {
          $set: action.payload
        }
      });

    case 'SET_LOADING_AUTH':
      return update(state, {
        loading: {
          $set: action.payload
        }
      });

    case 'OAUTH_LOGIN':
      return update(state, {
        token: {
          $set: action.payload
        }
      });

    case 'SET_ROLE':
      return update(state, {
        user: {
          $set: { ...state.user,
            role: action.payload
          }
        }
      });

    case 'DO_FORGOT_PASSWORD':
      return update(state, {
        forgot_password: {
          $set: action.payload
        }
      });

    case 'DO_LOGOUT':
      return update(state, {
        user: {
          $set: {}
        },
        token: {
          $set: null
        }
      });

    default:
      return state;
  }
}

function findArrayName(name, data) {
  let val = null;

  try {
    let check = name.split('[');
    let n = check[1].replace(']', '');
    let y = check[0];
    val = !isUndefined(data[y][n]) && !isNull(data[y][n]) ? data[y][n] : null;
  } catch (e) {
    val = !isUndefined(data[name]) && !isNull(data[name]) ? data[name] : null;
  }

  return val;
}

function fetchErrorDispatch(error, dispatch, prefix = '') {
  prefix = String(prefix).toUpperCase();

  if (prefix != 'NULL') {
    if (!isEqual(prefix, 'EXTRANET')) {
      dispatch({
        type: 'SET_LOADING_' + prefix,
        payload: false
      });
    }

    if (error.response) {
      if (!isEqual(prefix, 'EXTRANET')) {
        dispatch({
          type: 'SET_STATUS_' + prefix,
          payload: error.response.status
        });
      }

      dispatch({
        type: 'SET_STATUS',
        payload: error.response.status
      });

      if (error.response.status == 422) {
        dispatch({
          type: 'SET_VALIDATION',
          payload: error.response.data
        });
      }

      try {
        if (error.response.data.message) {
          dispatch({
            type: 'SET_MESSAGE',
            payload: error.response.data.message
          });
        }
      } catch (e) {}

      try {
        if (error.response.data.data) {
          dispatch({
            type: 'SET_MESSAGE_PAYLOAD',
            payload: error.response.data.data
          });
        }
      } catch (e) {}

      try {
        if (error.response.data.error == 'invalid_grant') {
          dispatch({
            type: 'SET_MESSAGE',
            payload: 'Email / Password salah'
          });
        }
      } catch (e) {}

      try {
        if (error.response.data.logout) {
          dispatch({
            type: 'DO_LOGOUT',
            payload: true
          });
        }
      } catch (e) {}
    } else if (error.request) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Terjadi kesalahan, silahkan dicoba kembali'
      });
    }
  }
}

function fetchSuccessDispatch(response, dispatch, prefix = '') {
  prefix = String(prefix).toUpperCase();

  if (prefix != 'NULL') {
    if (!isEqual(prefix, 'EXTRANET')) {
      dispatch({
        type: 'SET_STATUS_' + prefix,
        payload: response.status
      });
      dispatch({
        type: 'SET_LOADING_' + prefix,
        payload: false
      });
    }
  }
}

function numberFormat(angka, prefix = '') {
  let isMin = String(angka).substr(0, 1) == '-';
  let number_string = String(angka).replace(/[^,\d]/g, '').toString();
  let split = number_string.split(',');
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  prefix = isMin ? '-' + prefix : prefix;
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return rupiah ? prefix + rupiah : prefix + '0';
}

function secureData(data) {
  let d = new FormData();

  if (isObject(data)) {
    Object.keys(data).map((key, index) => {
      if (isArray(data[key])) {
        for (let i = 0; i < data[key].length; i++) {
          if (isObject(data[key][i])) {
            Object.keys(data[key][i]).map((k2, i2) => {
              if (!isUndefined(data[key][i][k2]) && !isNull(data[key][i][k2])) {
                d.append(key + '[' + i + '][' + k2 + ']', data[key][i][k2]);
              }
            });
          } else {
            if (!isUndefined(data[key][i]) && !isNull(data[key][i])) {
              d.append(key + '[' + i + ']', data[key][i]);
            }
          }
        }
      } else if (isObject(data[key])) {
        Object.keys(data[key]).map((k, i) => {
          if (!isUndefined(data[key][k]) && !isNull(data[key][k])) {
            d.append(key + '[' + k + ']', data[key][k]);
          }
        });
      } else {
        if (!isUndefined(data[key]) && !isNull(data[key])) {
          d.append(key, data[key]);
        }
      }

      return true;
    });
  }

  return d;
}

function setAuthHeader(auth, contentType = 'multipart/form-data') {
  let token_type = process.env.REACT_APP_API_TOKEN_TYPE;
  let access_token = process.env.REACT_APP_API_ACCESS_TOKEN;

  try {
    token_type = auth.token.token_type || '';
    access_token = auth.token.access_token || '';
  } catch (e) {}

  let Authorization = String(token_type + ' ' + access_token).trim();
  return {
    Authorization,
    'Content-Type': contentType
  };
}

function useDebounce(effect, delay, deps) {
  let callback = useCallback(effect, deps);
  useEffect(() => {
    let handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}

function defaultFilterData(data, columns, name) {
  let page = 1;
  let load = 10;
  let keyword = '';
  let sorted = [];
  let search = {};

  try {
    page = data[slug('page_' + name, '_')];
    load = data[slug('load_' + name, '_')];
    keyword = data[slug('keyword_' + name, '_')];
  } catch (e) {}

  Object.keys(data).map((key, index) => {
    let search_key = slug('search_' + name + '_', '_');
    let sort_key = slug('sort_' + name + '_', '_');

    if (key.toLowerCase().substring(0, search_key.length) == search_key.toLowerCase()) {
      columns.push(key.replace(search_key + '_', ''));
    }

    if (key.toLowerCase().substring(0, sort_key.length) == sort_key.toLowerCase()) {
      columns.push(key.replace(sort_key + '_', ''));
    }
  });
  columns = uniq(columns);

  for (let i = 0; i < columns.length; i++) {
    let kolom = columns[i] || '';

    try {
      let key = slug('search_' + name + '_' + kolom, '_');
      let cari = data[key];

      if (!isNull(cari) && !isUndefined(cari)) {
        search[kolom] = cari;
      }
    } catch (e) {}

    try {
      let key = slug('sort_' + name + '_' + kolom, '_');
      let urut = data[key];

      if (!isNull(urut) && !isUndefined(urut)) {
        sorted.push({
          id: kolom,
          desc: urut == 'desc'
        });
      }
    } catch (e) {}
  }

  let isi = {
    page: page || 1,
    load: load || 10,
    keyword: keyword || '',
    sorted: sorted || [],
    search: search || {}
  };
  return isi;
}

export { auth as authReducer, core as coreReducer, defaultFilterData, fetchErrorDispatch, fetchSuccessDispatch, findArrayName, numberFormat, secureData, setAuthHeader, slug, useDebounce };
//# sourceMappingURL=index.modern.js.map
