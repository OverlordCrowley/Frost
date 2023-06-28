const Router = require('express')
const router = new Router()
const  modelController = require('../controllers/modelController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/model', modelController.getAll)

module.exports = router
