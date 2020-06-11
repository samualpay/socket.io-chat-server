const util = require('../../common/utils')
module.exports = function (req, next) {
  const token = req.data.token
  req.payload = util.verifyToken(token)
  next()
}
