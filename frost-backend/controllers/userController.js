const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const {User, Basket, BasketDevice, Device} = require('../models/models')
const nodemailer = require("nodemailer");
const {validationResult} = require('express-validator')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Ошибка  при регистрации", errors});
        }
        const {email, password, name, first_name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        try{
            const candidate = await User.findOne({where: {'email' : email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, 'second_name': name, 'first_name' : first_name, pass: hashPassword})
            const basket = await Basket.create({userId: user.id})


            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jagerduque@gmail.com',
                    pass: 'sgtgunmakuzrjsxe',
                },
            });

            let result = await transporter.sendMail({
                from: 'jagerduque@gmail.com',
                to: email,
                subject: 'Регистрация FROST',
                text: 'Вы успешно зарегистрировались на сайте FROST',
                html: '<p>Вы успешно зарегистрировались на сайте FROST</p>',
            });
            const token = generateJwt(user.id, user.email)
            return res.json({token})
        }
        catch (error) {
            next(ApiError.badRequest('Ошибка регистрации'))

        }

    }

    async login(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Ошибка  при регистрации", errors});
        }
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.pass)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }

    async forgot(req, res, next) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'Пользователь с такой почтой не найден' });
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            user.resetToken = resetToken;
            await user.save();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jagerduque@gmail.com',
                    pass: 'sgtgunmakuzrjsxe',
                },
            });

            const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

            await transporter.sendMail({
                from: 'jagerduque@gmail.com',
                to: user.email,
                subject: 'Сброс пароля',
                text: 'Сброс пароля',
                html: `Для сброса пароля перейдите по ссылке: <a href="${resetUrl}">ссылка</a>`,
            });

            return res.json({ message: 'Письмо со ссылкой для сброса пароля отправлено на вашу почту' });
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async reset(req, res, next) {
        const { token } = req.params;
        const { password } = req.body;

        try {
            const user = await User.findOne({ where: { resetToken: token } });
            if (!user) {
                return res.status(404).json({ error: 'Неверный токен сброса пароля' });
            }

            const newPasswordHash = await bcrypt.hash(password, 5);
            user.pass = newPasswordHash;
            user.resetToken = null;
            await user.save();

            return res.json({ message: 'Пароль успешно изменен' });
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    };


    async getBaskedCount(req, res, next) {
        const { userId } = req.body;
        let basket = await Basket.findOne({ where: { userId: Number(userId) } });

        if (basket) {
            let basketDevices = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: [{ model: Device }],
            });

            return res.json({ basketDevices });
        } else {
            return res.status(404).json({ error: 'Корзина не найдена' });
        }

    }
}

module.exports = new UserController()
