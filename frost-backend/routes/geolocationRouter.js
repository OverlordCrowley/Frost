const Router = require('express')
const router = new Router()
const geolocationController = require('../controllers/geolocationController')
const {check} = require('express-validator')


router.get('/region', geolocationController.getAllRegion)
router.get('/country', geolocationController.getAllCountries)

module.exports = router
