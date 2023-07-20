const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', orderController.getAll)
router.post('/updateOrder', orderController.createOrUpdateOrder)

module.exports = router
