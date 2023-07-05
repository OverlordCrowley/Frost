const ApiError = require('../error/ApiError');
const {User, Basket, Device, GenerationType, Generation} = require('../models/models')
const {Op} = require("sequelize");
const {isBoolean} = require("validator");



class DeviceController {
    async getAll(req, res, next) {
        const {
            categoryId,
            modelId,
            brandId,
            available,
            generationId,
            currentPage,
            count
        } = req.query;

        console.log({
            categoryId,
            modelId,
            brandId,
            available,
            generationId,
            currentPage,
            count
        })

        const whereClause = {};

        if (categoryId && categoryId !== 'Все категории') {
            whereClause.categoryId = categoryId;
        }

        if (modelId && modelId !== 'Все модели') {
            whereClause.modelId = modelId;
        }

        if (brandId && brandId !== 'Все марки') {
            whereClause.brandId = brandId;
        }

        if (isBoolean(available) && available !== 'false') {
            whereClause.available = available;
        }

        try {
            let devices;
            let totalPages;

            if (generationId && generationId !== 'Все поколения') {
                const generation = await Generation.findOne({
                    where: { id: generationId }
                });

                if (!generation) {
                    return next(ApiError.internal('Некорректный идентификатор поколения'));
                }
            }

            const includeClause = [{
                model: GenerationType,
                required: generationId ? true : false,
                where: generationId ? { generationId } : {},
            }];

            if (currentPage && count) {
                devices = await Device.findAndCountAll({
                    where: whereClause,
                    include: includeClause,
                    limit: count,
                    offset: (currentPage - 1) * count
                });

                totalPages = Math.ceil(devices.count / count);
            } else {
                devices = await Device.findAll({
                    where: whereClause,
                    include: includeClause
                });

                totalPages = 1;
            }

            return res.json({
                currentPage: parseInt(currentPage),
                totalPages,
                devices
            });
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера'));
        }
    }


    async getOne(req, res, next) {
        const {deviceId} = req.query
        if (deviceId) {
            try{
                const device = await Device.findOne({where: {id: deviceId}})
                if (!device) {
                    return next(ApiError.badRequest('Товара с данным id, нет'))
                }
                return res.json({device})
            }
            catch (e){
                return next(ApiError.badRequest('Товара с данным id, нет'))
            }
        }
    }

    async getDevicesByCode(req, res, next) {
        const { code } = req.query;

        try {
            const devices = await Device.findAll({
                where: {
                    code: {
                        [Op.like]: `%${code}%`
                    }
                }
            });

            return res.json(devices);
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера'));
        }
    }


}

module.exports = new DeviceController()
