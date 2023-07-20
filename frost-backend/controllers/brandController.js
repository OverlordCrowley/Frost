const ApiError = require('../error/ApiError');
const {Brand} = require('../models/models')

class BrandController{
    async getAll(req, res, next) {
        try {

        const brand = await Brand.findAll()
        return res.json({brand})
        }
        catch (e){
            return next(ApiError.badRequest('Бренды не найдены'))
        }
    }
}

module.exports = new BrandController()
