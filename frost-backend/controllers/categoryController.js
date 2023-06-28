const ApiError = require('../error/ApiError');
const {User, Basket} = require('../models/models')

class CategoryController {
    async getAll(req, res, next) {
        const category = await User.findAll()
        return res.json({category})
    }

}

module.exports = new CategoryController()
