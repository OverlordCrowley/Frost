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
    number_home: { type: DataTypes.STRING, allowNull: true },
    pass: { type: DataTypes.STRING, allowNull: false },
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
    price: { type: DataTypes.STRING, allowNull: false },
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

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Category.hasMany(Device);
Device.belongsTo(Category);

Model.belongsTo(Brand);
Brand.hasMany(Model);

Generation.hasMany(GenerationType);
GenerationType.belongsTo(Generation);

Model.hasMany(GenerationType);
GenerationType.belongsTo(Model);

Device.hasMany(GenerationType);
GenerationType.belongsTo(Device);

Device.hasMany(Image);
Image.belongsTo(Device);

BasketDevice.belongsTo(Device);
Device.hasMany(BasketDevice);

Model.hasOne(Device);
Device.belongsTo(Model);

User.hasOne(Review);
Review.belongsTo(User);

Device.hasOne(Review);
Review.belongsTo(Device);

Basket.hasOne(Order);
Order.belongsTo(Basket);


module.exports = {
    User,
    Basket,
    BasketDevice,
    Image,
    Device,
    Category,
    Model,
    Brand,
    Generation,
    GenerationType,
    Order,
    Review
};
