const paramValid = require('../middlewares/paramValid')
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
      (req) => {
        console.log(req)
      }
    ]
  }
]
