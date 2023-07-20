const ApiError = require('../error/ApiError');
const {Category} = require('../models/models')

class CategoryController {
    async getAll(req, res, next) {
        try {
            const category = await Category.findAll()
            return res.json({category})
        }
        catch (e){
            return next(ApiError.badRequest('Категории не найдены'))
        }
    }

}

module.exports = new CategoryController()
