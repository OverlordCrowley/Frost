const ApiError = require('../error/ApiError');
const {User, Basket, Order, BasketDevice, Device} = require('../models/models')
const moment = require("moment");

class OrderController{

    async getAll(req, res, next) {
        const { userId } = req.body;

        try {
            const basket = await Basket.findOne({ where: { userId } });

            if (!basket) {
                return res.json({ orders: [] });
            }

            const orders = await Order.findAll({ where: { basketId: basket.id } });

            const result = [];

            for (const order of orders) {
                const { description } = order;
                const devices = [];
                let totalCost = 0;

                for (const item of description) {
                    const { deviceId, count } = item;

                    const device = await Device.findByPk(deviceId);
                    if (device) {
                        devices.push({ device, count });

                        const deviceCost = parseFloat(device.price);
                        totalCost += deviceCost * count;
                    }
                }

                const formattedUpdatedAt = moment(order.updatedAt).format('DD.MM.YYYY');

                result.push({
                    orderId: order.id,
                    devices,
                    totalCost,
                    updatedAt: formattedUpdatedAt,
                });
            }

            return res.json({ orders: result });
        } catch (error) {
            console.error(error);
            return next(ApiError.badRequest('Невозможно получить заказы.'));
        }
    }





    async createOrUpdateOrder(req, res, next) {
        const {
            userId,
            paymentMethod,
            first_name,
            second_name,
            last_name,
            email,
            tel,
            country,
            region,
            city,
            street,
            home,
            number,
            position
        } = req.body;

        try {
            let basket = await Basket.findOne({ where: { userId } });
            let basketDevices = await BasketDevice.findAll({ where: { basketId: basket.id } });
            let order = await Order.findOne({ where: { basketId: basket.id, position: false } });

            if (basket && basketDevices) {
                if (order) {
                    order.payment_method = paymentMethod;
                    order.description = basketDevices;

                    if (first_name) {
                        order.first_name = first_name;
                    }

                    if (second_name) {
                        order.second_name = second_name;
                    }

                    if (last_name) {
                        order.last_name = last_name;
                    }

                    if (paymentMethod) {
                        order.payment_method = paymentMethod;
                    }

                    if (email) {
                        order.email = email;
                    }

                    if (tel) {
                        order.tel = tel;
                    }

                    if (country) {
                        order.country = country;
                    }

                    if (region) {
                        order.region = region;
                    }

                    if (city) {
                        order.city = city;
                    }

                    if (street) {
                        order.street = street;
                    }

                    if (home) {
                        order.home = home;
                    }

                    if (number) {
                        order.number = number;
                    }

                    if (position !== undefined) {
                        order.position = position;
                        if(position === true){
                            let items = await BasketDevice.destroy({where: {'basketId' : basket.id}})
                        }
                    }

                    await order.save();
                } else {
                    order = await Order.create({
                        basketId: basket.id,
                        payment_method: paymentMethod,
                        description: basketDevices,
                        first_name,
                        second_name,
                        last_name,
                        email,
                        tel,
                        country,
                        region,
                        city,
                        street,
                        home,
                        number,
                        position
                    });
                }

                return res.json({ message: 'Order created or updated successfully.' });
            } else {
                return res.status(400).json({ error: 'Basket or basket devices not found.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to create or update order.' });
        }
    }



}

module.exports = new OrderController()
