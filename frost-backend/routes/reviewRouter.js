const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/brand', reviewController.getAll)

module.exports = router
