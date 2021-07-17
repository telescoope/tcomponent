import slugify from 'slugify'

function slug(data, separator = '_') {
  return slugify(String(data), {
    replacement: separator,
    remove: /[*+~.()'"!:@]/g,
    lower: false
  })
}

export default slug
