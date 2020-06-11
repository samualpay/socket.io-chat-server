const jwt = require('jsonwebtoken')
const config = require('../config')
const errors = require('../errors')
module.exports = {
  createToken: (payload) => {
    const token = jwt.sign(payload, config.tokenKey)
    return token
  },
  verifyToken: (token) => {
    let payload = {}
    try {
      payload = jwt.verify(token, config.tokenKey)
    } catch (err) {
      throw errors.VerifyTokenError
    }
    return payload
  },
  successResponse: (data) => {
    return {
      status: 1,
      err_msg: '',
      data
    }
  },
  errorResponse: (errMsg) => {
    if (errMsg.isCustom) {
      return {
        status: errMsg.status,
        err_msg: errMsg.msg,
        data: {}
      }
    } else {
      return {
        status: 500,
        err_msg: 'server error',
        data: errMsg
      }
    }
  }
}
