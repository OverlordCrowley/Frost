const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {check} = require('express-validator')

router.post('/registration', [
    check('email', 'Email пользователя не может быть пустым')
        .notEmpty()
        .isEmail()
        .trim()
        .isLength({min: 6, max: 45}),
    check('password', 'Пароль пользователя не может быть пустым')
        .notEmpty()
        .trim()
        .isLength({min: 8, max: 45}),
    check('name', 'Имя пользователя не может быть пустым')
        .notEmpty()
        .trim()
        .isLength({min: 2, max: 45}),
    check('first_name', 'Фамилия пользователя не может быть пустым')
        .notEmpty()
        .trim()
        .isLength({min: 2, max: 45})
], userController.registration)
router.post('/login', [
    check('email', 'Email пользователя не может быть пустым')
        .notEmpty()
        .isEmail()
        .trim()
        .isLength({min: 6, max: 45}),
    check('password', 'Email пользователя не может быть пустым')
        .notEmpty()
        .trim()
        .isLength({min: 8, max: 45}),
], userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/forgot', userController.forgot)
router.post('/reset/:token', userController.reset)
router.post('/basket', userController.getBaskedCount)

module.exports = router
