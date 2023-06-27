const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    second_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: true },
    telephone: { type: DataTypes.STRING, allowNull: true },
    region: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    home: { type: DataTypes.STRING, allowNull: true },
    number: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Image = sequelize.define('image', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    path: { type: DataTypes.STRING, unique: true },
});

const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    manufacturer: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.BOOLEAN, allowNull: false },
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Model = sequelize.define('model', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Generation = sequelize.define('generation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    basketId: { type: DataTypes.INTEGER },
});

const GenerationType = sequelize.define('generation_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },

});

// Определение связей после определения всех моделей
User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Brand.hasOne(Device);
Device.belongsTo(Brand);

Model.hasMany(Device);
Device.belongsTo(Model);

Generation.hasMany(GenerationType);
GenerationType.belongsTo(Generation);

Model.hasOne(Brand);
Brand.belongsTo(Model);

Generation.hasOne(Brand);
Brand.belongsTo(Generation);

Device.hasMany(GenerationType);
GenerationType.belongsTo(Device);

Device.hasMany(Image);
Image.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

User.hasOne(Device);
Device.belongsTo(User);

Review.hasOne(User);
User.belongsTo(Review);

module.exports = {
    User,
    Basket,
    BasketDevice,
    Image,
    Device,
    Category,
    Model,
    Generation,
    GenerationType,
    Order,
    Review
};
