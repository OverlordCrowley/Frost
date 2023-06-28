const Router = require('express')
const router = new Router()
const emailController = require('../controllers/emailController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/email', emailController.getAll)

module.exports = router
