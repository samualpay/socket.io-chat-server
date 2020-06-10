const Errors = require('../../errors')
module.exports = function (param) {
  return async function (req, next, event) {
    const data = req.data
    const keys = param.required
    if (keys && keys.length > 0) {
      for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          throw Errors.RequiredParameterNotFound
        }
      }
    }
    if (param.properties) {
      const keys = Object.keys(param.properties)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (param.properties[key].type === 'array') {
            if (data[key].constructor !== Array) {
              throw Errors.RequiredParameterNotFound
            }
          } else if (param.properties[key].type === 'string' && typeof data[key] !== 'string') {
            throw Errors.RequiredParameterNotFound
          } else if (param.properties[key].type === 'number' && typeof data[key] !== 'number') {
            throw Errors.RequiredParameterNotFound
          }
          if (param.properties[key].enum && param.properties[key].enum.length > 0) {
            const enums = param.properties[key].enum
            if (!enums.includes(data[key])) {
              throw Errors.RequiredParameterNotFound
            }
          }
        }
      }
    }
    next()
  }
}
