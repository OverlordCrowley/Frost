const ApiError = require('../error/ApiError');
const {User, Basket} = require('../models/models')

class ReviewController{
    async getAll(req, res, next) {
        try {
            const category = await User.findAll()
            return res.json({category})
        }
        catch (e){
            return next(ApiError.badRequest('Комментарии не найдены'))
        }
    }

}

module.exports = new ReviewController()
