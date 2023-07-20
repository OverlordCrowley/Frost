const ApiError = require('../error/ApiError');
const {User, Basket, BasketDevice, Device} = require('../models/models')

class BasketController {

    async addToCart(req, res, next) {
        const { count, userId, deviceId } = req.body;
        if (count && userId && deviceId) {
            try {
                const user = await User.findByPk(userId);
                if (!user) {
                    return next(ApiError.badRequest('Пользователь не найден'))
                }

                const basket = await Basket.findOne({ where: { userId } });
                if (!basket) {
                    return next(ApiError.badRequest('Произошла ошибка во время добавления товара в корзину'))
                }

                const device = await Device.findByPk(deviceId);
                if (!device) {
                    return next(ApiError.badRequest('Устройство не найдено'))
                }

                const deviceItem = await BasketDevice.findOne({where: {
                        'basketId': basket.id,
                        'deviceId': deviceId
                    }})
                if(deviceItem){
                    return next(ApiError.badRequest('Товар уде был добавлен в корзину'))
                }
                const basketDevice = await BasketDevice.create({
                    basketId: basket.id,
                    'deviceId': deviceId,
                    'count' : count
                });

                return res.json({ message: 'Item added to cart successfully' });
            } catch (error) {
                return next(ApiError.badRequest('Произошла ошибка во время добавления товара в корзину'))
            }
        } else {
            return next(ApiError.badRequest('Ошибка запроса'))
        }
    }

    async getBaskedCount(req, res, next) {
        const { id } = req.body;
        let basket = await Basket.findOne({ where: { userId: Number(id) } });

        if (basket) {
            let basketDevices = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: [{ model: Device }],
            });

            return res.json({ basketDevices });
        } else {
            return next(ApiError.badRequest('Корзина не найдена'))
        }

    }

    async updateItemCount(req, res, next) {
        const { deviceId, count, userId } = req.body;

        try {
            let basket = await Basket.findOne({ where: { 'userId': Number(userId) } });
            if(basket){
                let basketDevice = await BasketDevice.findOne({ where: { deviceId, 'basketId': basket.id } });

                if (basketDevice) {
                    basketDevice.count = count;
                    await basketDevice.save();

                    return res.json({ basketDevice });
                } else {
                    return next(ApiError.badRequest("Корзина не найдена"));
                }
            }
            else{
                return next(ApiError.badRequest("Внутренняя ошибка сервера"));
            }

        } catch (error) {
            return next(ApiError.badRequest("Внутренняя ошибка сервера"));
        }
    }

        async deleteItem(req, res, next) {
            const { deviceId, userId } = req.query;
            try {
                let basket = await Basket.findOne({where: {'userId': userId}})
                let basketDevice = await BasketDevice.destroy({
                    where: { deviceId, basketId:  basket.id},
                    include: [{
                        model: Device
                    }]});
                    return res.json({ basketDevice });
                }
             catch (error) {
                return next(ApiError.badRequest("Внутренняя ошибка сервера"));
            }
        }
}

module.exports = new BasketController()
