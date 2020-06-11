const util = require('../../common/utils')
async function checkAccountIsExist (account, password) {
// todo: load account from db
}
module.exports.login = async function (account, password) {
  checkAccountIsExist()
  const token = util.createToken({ account })
  return token
}
