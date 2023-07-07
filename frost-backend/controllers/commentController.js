const ApiError = require('../error/ApiError');
const {User, Basket, Device, GenerationType, Generation, Image, Review} = require('../models/models')
const {Op} = require("sequelize");
const {isBoolean} = require("validator");
const path = require("path");


class CommentController {


    async getComments(req, res, next) {

        const { id } = req.query;

        if (id) {
            try {
                const comment = await Review.findAll({
                    where: { 'deviceId': id },
                    include: [{
                        model: User,
                        attributes: ['first_name', 'second_name']
                    }]
                });

                if (!comment) {
                    return next(ApiError.badRequest('Комментариев с данным id не существует'));
                }

                return res.json({ comment });
            } catch (error) {
                return next(ApiError.badRequest('Комментариев с данным id не существует'));
            }
        }
    }

}

module.exports = new CommentController()
