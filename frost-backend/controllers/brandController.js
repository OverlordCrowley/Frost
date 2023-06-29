const ApiError = require('../error/ApiError');
const {Brand} = require('../models/models')

class BrandController{
    async getAll(req, res, next) {
        const brand = await Brand.findAll()
        return res.json({brand})
    }
}

module.exports = new BrandController()
