const ApiError = require('../error/ApiError');
const {User, Basket, BasketDevice, Device, Region, Country} = require('../models/models')

class BasketController {

    async getAllRegion(req, res, next) {
        const { countryId } = req.params;
        if (countryId) {
            try {
                const region = await Region.findAll({where: {"countryId": countryId}});
                return res.json({ region });
            } catch (error) {
                return next(ApiError.badRequest('Регионы в данной стране отсутствуют'))
            }
        } else {
            return next(ApiError.badRequest('Регионы в данной стране отсутствуют'))
        }
    }

    async getAllCountries(req, res, next) {

            try {
                const country = await Country.findAll();
                return res.json({ country });
            } catch (error) {
                return next(ApiError.badRequest('Произошла ошибка при поиске регионов'))
            }
    }
}

module.exports = new BasketController()
