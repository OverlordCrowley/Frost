const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const {check} = require('express-validator')

router.post('/', authMiddleware, basketController.addToCart)
router.post('/basket', authMiddleware, basketController.getBaskedCount)
router.put('/', authMiddleware, basketController.updateItemCount)
router.delete('/', authMiddleware, basketController.deleteItem)

module.exports = router
