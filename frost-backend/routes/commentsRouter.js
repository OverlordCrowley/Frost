const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', commentController.getComments)

module.exports = router
