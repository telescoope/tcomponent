export default function setAuthHeader(
  auth,
  contentType = 'multipart/form-data'
) {
  let token_type = process.env.REACT_APP_API_TOKEN_TYPE
  let access_token = process.env.REACT_APP_API_ACCESS_TOKEN
  try {
    token_type = auth.token.token_type || ''
    access_token = auth.token.access_token || ''
  } catch (e) {}
  let Authorization = String(token_type + ' ' + access_token).trim()
  return {
    Authorization,
    'Content-Type': contentType
  }
}
