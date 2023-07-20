const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const {User, Basket, BasketDevice, Device, Generation, Order, EmailReset} = require('../models/models')
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

    async getInfo(req, res, next) {
        let {userId} = req.body
        try{
            if(userId){
                let user = await User.findOne(
                    {where: {id: userId},
                        attributes: ['first_name', 'second_name', 'last_name', 'email', 'telephone', 'region', 'city', 'street', 'home', 'number_home', ]
                    },
                )
                return res.json({user})
            }
        }
        catch (e){
            return next(ApiError.badRequest('Нет информации с данным пользователем'))
        }
        return res.json({})
    }

    async forgot(req, res, next) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь с такой почтой не найден'));
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            const emailReset = await EmailReset.findOne({where: {"userId": user.id}})

            if (emailReset && emailReset.time) {
                const currentTime = new Date();
                const resetTime = new Date(emailReset.createdAt);
                const timeDiff = Math.abs(currentTime - resetTime);
                const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));

                if (hoursDiff < 24) {
                    return next(ApiError.badRequest('Сброс пароля доступен только раз в 24 часа'));
                }
                    let oldMail = await EmailReset.destroy({where: {"userId": user.id}})

            }


            const emailResetNew = await EmailReset.create({
                userId: user.id,
                time: new Date().toISOString(),
                token: resetToken,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jagerduque@gmail.com',
                    pass: 'sgtgunmakuzrjsxe',
                },
            });

            const resetUrl = `http://localhost:3000/passwordChange/${resetToken}`;

            await transporter.sendMail({
                from: 'jagerduque@gmail.com',
                to: user.email,
                subject: 'Сброс пароля',
                text: 'Сброс пароля',
                html: `Для сброса пароля перейдите по ссылке: <a href="${resetUrl}">ссылка</a>`,
            });

            return res.json({ message: 'Письмо со ссылкой для сброса пароля отправлено на вашу почту' });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async reset(req, res, next) {
        const { token } = req.params;
        const { oldPass, newPass } = req.body;

        try {
            const emailReset = await EmailReset.findOne({ where: { 'token': token } });
            if (!emailReset) {
                return res.status(404).json({ error: 'Неверный токен сброса пароля' });
            }

            const user = await User.findOne({ where: { 'id': emailReset.userId,  } });
            let comparePassword = bcrypt.compareSync(oldPass, user.pass)
            if(!comparePassword){
                return res.status(404).json({ error: 'Неверный пароль' });
            }
            user.pass = await bcrypt.hash(newPass, 5);
            const deleteEmail = EmailReset.destroy({where: {"token" : token}});
            await user.save();

            return res.json({ message: 'Пароль успешно изменен' });
        } catch (error) {
            console.log(error)
            // return res.status(500).json({ error: 'Ошибка сервера' });
        }
    };

    async update(req, res, next) {
        const {
            userId,
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
        } = req.body;

        try {
            let user = await User.findOne({ where: { "id": userId } });

                if (user) {

                    if (first_name) {
                        user.first_name = first_name;
                    }

                    if (second_name) {
                        user.second_name = second_name;
                    }

                    if (last_name) {
                        user.last_name = last_name;
                    }

                    if (email) {
                        user.email = email;
                    }
                    if (tel) {
                        user.telephone = tel;
                    }

                    if (country) {
                        user.country = country;
                    }

                    if (region) {
                        user.region = region;
                    }

                    if (city) {
                        user.city = city;
                    }

                    if (street) {
                        user.street = street;
                    }

                    if (home) {
                        user.home = home;
                    }

                    if (number) {
                        user.number_home = number;
                    }


                    await user.save();
                }

                return res.json({ message: 'Данные пользователя были успешно обновлены.' });
        } catch (error) {
            console.error(error);
            return next(ApiError.badRequest('Ошибка в обновлении данных пользователя'))
        }
    }

}

module.exports = new UserController()
