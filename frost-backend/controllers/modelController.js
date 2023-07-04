const ApiError = require('../error/ApiError');
const {Model} = require('../models/models')

class ModelController{
    async getAll(req, res, next) {
        let {brandId} = req.query;
        if(brandId){
            const model = await Model.findAll({where:{'brandId' : brandId}})
            return res.json({model})
        }
        const model = await Model.findAll()
        return res.json({model})
    }
}

module.exports = new ModelController()
