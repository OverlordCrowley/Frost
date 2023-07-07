const ApiError = require('../error/ApiError');
const {Model, GenerationType, Image, Brand, Device} = require('../models/models')

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
        const { id } = req.query;

        if (id) {
            try {
                const generationTypes = await GenerationType.findAll({
                    where: { deviceId: id },
                    include: [
                        {
                            model: Model,
                            attributes: ['id', 'name'],
                        },
                    ],
                });

                return res.json(generationTypes);
            } catch (error) {
                console.log(error);
                return next(ApiError.internal('Ошибка сервера'));
            }
        }
    }










}

module.exports = new ModelController()
