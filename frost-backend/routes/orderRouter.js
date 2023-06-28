const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/order', orderController.getAll)

module.exports = router
