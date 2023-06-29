const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', brandController.getAll)

module.exports = router
