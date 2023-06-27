const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/registration', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
