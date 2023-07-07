const Router = require('express')
const router = new Router()
const  modelController = require('../controllers/modelController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', modelController.getAll)
router.get('/byItemID', modelController.getByItemId)

module.exports = router
