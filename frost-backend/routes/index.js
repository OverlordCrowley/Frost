const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const modelRouter = require('./modelRouter')
const generationRouter = require('./generationRouter')
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const commentRouter = require('./commentsRouter')


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/model', modelRouter)
router.use('/generation', generationRouter)
router.use('/device', deviceRouter)
router.use('/comment', commentRouter)

module.exports = router
