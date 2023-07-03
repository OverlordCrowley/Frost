const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', deviceController.getAll)
router.get('/code', deviceController.getDevicesByCode)
router.get('/one', deviceController.getOne)

module.exports = router
