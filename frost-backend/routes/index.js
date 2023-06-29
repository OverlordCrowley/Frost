const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const modelRouter = require('./modelRouter')
const generationRouter = require('./generationRouter')


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/model', modelRouter)
router.use('/generation', generationRouter)

module.exports = router
