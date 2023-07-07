const ApiError = require('../error/ApiError');
const {Model, GenerationType} = require('../models/models')

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

    async getByItemId(req, res, next) {
        let {id} = req.query;
        if(id){
            const model = await GenerationType.findAll({where:{'deviceId' : id}})
            return res.json({model})
        }
    }
}

module.exports = new ModelController()
