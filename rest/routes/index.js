var express = require('express')
var router = express.Router()
const util = require('../../common/utils')
const userController = require('../controller/user')
function loadController (controller) {
  function runnerProxy (runner) {
    return async (req, res, next) => {
      try {
        const result = await runner(req, res, next)
        res.json(util.successResponse(result))
      } catch (err) {
        next(err)
      }
    }
  }
  controller.forEach(elem => {
    router[elem.method](elem.path, ...elem.middlewares, runnerProxy(elem.runner))
  })
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
loadController(userController)

module.exports = router
