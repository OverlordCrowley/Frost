const Router = require('express')
const router = new Router()
const  generationController = require('../controllers/generationController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/generation', generationController.getAll)

module.exports = router
