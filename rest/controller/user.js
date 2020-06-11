const userService = require('../service/user')
module.exports = [
  {
    path: '/v1/login',
    method: 'post',
    middlewares: [],
    runner: async (req, res, next) => {
      const account = req.body.account
      const password = req.body.password
      const token = await userService.login(account, password)
      return { token }
    }
  }
]
