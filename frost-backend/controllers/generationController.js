const ApiError = require('../error/ApiError');
const {Generation, GenerationType} = require('../models/models')

class GenerationController{
    async getAll(req, res, next) {
    try {

     let {modelId} = req.query;

        if (modelId) {

            const generationTypes = await GenerationType.findAll({
                where: { modelId },
                include: [
                    {
                        model: Generation,
                        as: 'generation',
                    },
                ],
            });


            const arr = generationTypes.map((generationType) => {
                const generationData = generationType.generation;
                return generationData;
            });

            return res.json({ arr });
        }


        const generation = await Generation.findAll()
        return res.json({generation})

    }
    catch (e){
        next(ApiError.badRequest('Поколения с такой моделью не существует'))
    }
    }
}

module.exports = new GenerationController()
