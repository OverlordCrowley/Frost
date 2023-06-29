const ApiError = require('../error/ApiError');
const {Generation, GenerationType} = require('../models/models')

class GenerationController{
    async getAll(req, res, next) {

        let {modelId} = req.query;

        if(modelId){
            const generation = await GenerationType.findAll({where: {"modelId" : modelId}})
            return res.json({generation})
        }

        const generation = await Generation.findAll()
        return res.json({generation})


    }
}

module.exports = new GenerationController()
