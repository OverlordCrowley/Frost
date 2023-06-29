const ApiError = require('../error/ApiError');
const {Category} = require('../models/models')

class CategoryController {
    async getAll(req, res, next) {
        const category = await Category.findAll()
        return res.json({category})
    }

}

module.exports = new CategoryController()
