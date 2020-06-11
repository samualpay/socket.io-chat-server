const paramValid = require('../middlewares/paramValid')
const verifyToken = require('../middlewares/verifyToken')
module.exports = [
  {
    event: 'login',
    runners: [
      paramValid({
        required: ['token'],
        properties: {
          token: {
            type: 'string'
          }
        }
      }),
      verifyToken,
      async function (req) {
        this.isLogin = true
        this.setUserProperties(req.payload)
        console.log(this)
      }
    ]
  }
]
