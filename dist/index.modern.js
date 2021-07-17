import update from 'immutability-helper';
import slugify from 'slugify';
import { isUndefined, isNull, isEqual, isObject, isArray, uniq } from 'lodash';
import { useCallback, useEffect } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function slug(data, separator) {
  if (separator === void 0) {
    separator = '_';
  }

  return slugify(String(data), {
    replacement: separator,
    remove: /[*+~.()'"!:@]/g,
    lower: false
  });
}

function core(state, action) {
  var _modal;

  if (state === void 0) {
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
    };
  }

  var _ref = action.payload || {},
      key = _ref.key,
      value = _ref.value;

  var new_selected = {};
  var newval = {};
  var is_object = false;
  var v = null;
  var res = [];
  var m = [];
  key = slug(String(key), '_');

  switch (action.type) {
    case 'SET_MULTI_FILTER':
      newval = _extends({}, state.filter, action.payload);
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
          var _res$, _filter;

          return update(state, {
            filter: (_filter = {}, _filter[res[0]] = (_res$ = {}, _res$[String(m[1])] = {
              $set: value
            }, _res$), _filter)
          });
        } else {
          var _v, _filter2;

          v = (_v = {}, _v[String(m[1])] = value, _v);
          return update(state, {
            filter: (_filter2 = {}, _filter2[res[0]] = {
              $set: v
            }, _filter2)
          });
        }
      } catch (e) {
        var _filter3;

        return update(state, {
          filter: (_filter3 = {}, _filter3[key] = {
            $set: value
          }, _filter3)
        });
      }

      break;

    case 'SET_MULTI_PARAMETER':
      newval = _extends({}, state.parameter, action.payload);
      return update(state, {
        parameter: {
          $set: newval
        }
      });

    case 'RESET_SELECTED':
      Object.keys(state.parameter).map(function (key, index) {
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
          var _res$2, _parameter;

          return update(state, {
            parameter: (_parameter = {}, _parameter[res[0]] = (_res$2 = {}, _res$2[String(m[1])] = {
              $set: value
            }, _res$2), _parameter)
          });
        } else {
          var _v2, _parameter2;

          v = (_v2 = {}, _v2[String(m[1])] = value, _v2);
          return update(state, {
            parameter: (_parameter2 = {}, _parameter2[res[0]] = {
              $set: v
            }, _parameter2)
          });
        }
      } catch (e) {
        var _parameter3;

        return update(state, {
          parameter: (_parameter3 = {}, _parameter3[key] = {
            $set: value
          }, _parameter3)
        });
      }

      break;

    case 'SET_MULTI_INPUT':
      newval = _extends({}, state.input, action.payload);
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
          var _res$3, _input;

          return update(state, {
            input: (_input = {}, _input[res[0]] = (_res$3 = {}, _res$3[String(m[1])] = {
              $set: value
            }, _res$3), _input)
          });
        } else {
          var _v3, _input2;

          v = (_v3 = {}, _v3[String(m[1])] = value, _v3);
          return update(state, {
            input: (_input2 = {}, _input2[res[0]] = {
              $set: v
            }, _input2)
          });
        }
      } catch (e) {
        var _input3;

        return update(state, {
          input: (_input3 = {}, _input3[key] = {
            $set: value
          }, _input3)
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
        modal: (_modal = {}, _modal[key] = {
          $set: value
        }, _modal)
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

function auth(state, action) {
  if (state === void 0) {
    state = {
      role: '',
      user: {},
      token: '',
      forgot_password: {},
      loading: false
    };
  }

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
          $set: _extends({}, state.user, {
            role: action.payload
          })
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
  var val = null;

  try {
    var check = name.split('[');
    var n = check[1].replace(']', '');
    var y = check[0];
    val = !isUndefined(data[y][n]) && !isNull(data[y][n]) ? data[y][n] : null;
  } catch (e) {
    val = !isUndefined(data[name]) && !isNull(data[name]) ? data[name] : null;
  }

  return val;
}

function fetchErrorDispatch(error, dispatch, prefix) {
  if (prefix === void 0) {
    prefix = '';
  }

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

function fetchSuccessDispatch(response, dispatch, prefix) {
  if (prefix === void 0) {
    prefix = '';
  }

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

function numberFormat(angka, prefix) {
  if (prefix === void 0) {
    prefix = '';
  }

  var isMin = String(angka).substr(0, 1) == '-';
  var number_string = String(angka).replace(/[^,\d]/g, '').toString();
  var split = number_string.split(',');
  var sisa = split[0].length % 3;
  var rupiah = split[0].substr(0, sisa);
  var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    var separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  prefix = isMin ? '-' + prefix : prefix;
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return rupiah ? prefix + rupiah : prefix + '0';
}

function secureData(data) {
  var d = new FormData();

  if (isObject(data)) {
    Object.keys(data).map(function (key, index) {
      if (isArray(data[key])) {
        var _loop = function _loop(i) {
          if (isObject(data[key][i])) {
            Object.keys(data[key][i]).map(function (k2, i2) {
              if (!isUndefined(data[key][i][k2]) && !isNull(data[key][i][k2])) {
                d.append(key + '[' + i + '][' + k2 + ']', data[key][i][k2]);
              }
            });
          } else {
            if (!isUndefined(data[key][i]) && !isNull(data[key][i])) {
              d.append(key + '[' + i + ']', data[key][i]);
            }
          }
        };

        for (var i = 0; i < data[key].length; i++) {
          _loop(i);
        }
      } else if (isObject(data[key])) {
        Object.keys(data[key]).map(function (k, i) {
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

function setAuthHeader(auth, contentType) {
  if (contentType === void 0) {
    contentType = 'multipart/form-data';
  }

  var token_type = process.env.REACT_APP_API_TOKEN_TYPE;
  var access_token = process.env.REACT_APP_API_ACCESS_TOKEN;

  try {
    token_type = auth.token.token_type || '';
    access_token = auth.token.access_token || '';
  } catch (e) {}

  var Authorization = String(token_type + ' ' + access_token).trim();
  return {
    Authorization: Authorization,
    'Content-Type': contentType
  };
}

function useDebounce(effect, delay, deps) {
  var callback = useCallback(effect, deps);
  useEffect(function () {
    var handler = setTimeout(function () {
      callback();
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}

function defaultFilterData(data, columns, name) {
  var page = 1;
  var load = 10;
  var keyword = '';
  var sorted = [];
  var search = {};

  try {
    page = data[slug('page_' + name, '_')];
    load = data[slug('load_' + name, '_')];
    keyword = data[slug('keyword_' + name, '_')];
  } catch (e) {}

  Object.keys(data).map(function (key, index) {
    var search_key = slug('search_' + name + '_', '_');
    var sort_key = slug('sort_' + name + '_', '_');

    if (key.toLowerCase().substring(0, search_key.length) == search_key.toLowerCase()) {
      columns.push(key.replace(search_key + '_', ''));
    }

    if (key.toLowerCase().substring(0, sort_key.length) == sort_key.toLowerCase()) {
      columns.push(key.replace(sort_key + '_', ''));
    }
  });
  columns = uniq(columns);

  for (var i = 0; i < columns.length; i++) {
    var kolom = columns[i] || '';

    try {
      var key = slug('search_' + name + '_' + kolom, '_');
      var cari = data[key];

      if (!isNull(cari) && !isUndefined(cari)) {
        search[kolom] = cari;
      }
    } catch (e) {}

    try {
      var _key = slug('sort_' + name + '_' + kolom, '_');

      var urut = data[_key];

      if (!isNull(urut) && !isUndefined(urut)) {
        sorted.push({
          id: kolom,
          desc: urut == 'desc'
        });
      }
    } catch (e) {}
  }

  var isi = {
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
