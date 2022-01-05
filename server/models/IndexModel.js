import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acuqire: 30000,
      idle: 10000,
    },
  }
);

const DataTypes = require("sequelize").DataTypes;
const _address = require("./address");
const _hosted = require("./hosted");
const _house_images = require("./house_images");
const _houses = require("./houses");
const _houses_bedroom = require("./houses_bedroom");
const _houses_reserve_lines = require("./houses_reserve_lines");
const _houses_reverse = require("./houses_reverse");
const _houses_reviews = require("./houses_reviews");
const _orders = require("./orders");
const _users = require("./users");

const initModels = (sequelize) => {
  const address = _address(sequelize, DataTypes);
  const hosted = _hosted(sequelize, DataTypes);
  const house_images = _house_images(sequelize, DataTypes);
  const houses = _houses(sequelize, DataTypes);
  const houses_bedroom = _houses_bedroom(sequelize, DataTypes);
  const houses_reserve_lines = _houses_reserve_lines(sequelize, DataTypes);
  const houses_reverse = _houses_reverse(sequelize, DataTypes);
  const houses_reviews = _houses_reviews(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  houses.belongsTo(hosted, {
    as: "house_hosted_account_hosted",
    foreignKey: "house_hosted_account",
  });
  hosted.hasMany(houses, { as: "houses", foreignKey: "house_hosted_account" });
  house_images.belongsTo(houses, {
    as: "hoim_host",
    foreignKey: "hoim_host_id",
  });
  houses.hasMany(house_images, {
    as: "house_images",
    foreignKey: "hoim_host_id",
  });
  houses_reserve_lines.belongsTo(houses, {
    as: "hrit_host",
    foreignKey: "hrit_host_id",
  });
  houses.hasMany(houses_reserve_lines, {
    as: "houses_reserve_lines",
    foreignKey: "hrit_host_id",
  });
  houses_reviews.belongsTo(houses, {
    as: "hore_host",
    foreignKey: "hore_host_id",
  });
  houses.hasMany(houses_reviews, {
    as: "houses_reviews",
    foreignKey: "hore_host_id",
  });
  houses_reserve_lines.belongsTo(houses_bedroom, {
    as: "hrith_hobed",
    foreignKey: "hrith_hobed_id",
  });
  houses_bedroom.hasMany(houses_reserve_lines, {
    as: "houses_reserve_lines",
    foreignKey: "hrith_hobed_id",
  });
  houses_reserve_lines.belongsTo(houses_reverse, {
    as: "hrit_hove",
    foreignKey: "hrit_hove_id",
  });
  houses_reverse.hasMany(houses_reserve_lines, {
    as: "houses_reserve_lines",
    foreignKey: "hrit_hove_id",
  });
  houses_reserve_lines.belongsTo(orders, {
    as: "hrit_order_name_order",
    foreignKey: "hrit_order_name",
  });
  orders.hasMany(houses_reserve_lines, {
    as: "houses_reserve_lines",
    foreignKey: "hrit_order_name",
  });
  address.belongsTo(users, { as: "addr_user", foreignKey: "addr_user_id" });
  users.hasMany(address, { as: "addresses", foreignKey: "addr_user_id" });
  houses_reverse.belongsTo(users, {
    as: "hove_user",
    foreignKey: "hove_user_id",
  });
  users.hasMany(houses_reverse, {
    as: "houses_reverses",
    foreignKey: "hove_user_id",
  });
  houses_reviews.belongsTo(users, {
    as: "hore_user",
    foreignKey: "hore_user_id",
  });
  users.hasMany(houses_reviews, {
    as: "houses_reviews",
    foreignKey: "hore_user_id",
  });
  orders.belongsTo(users, { as: "order_user", foreignKey: "order_user_id" });
  users.hasMany(orders, { as: "orders", foreignKey: "order_user_id" });

  return {
    address,
    hosted,
    house_images,
    houses,
    houses_bedroom,
    houses_reserve_lines,
    houses_reverse,
    houses_reviews,
    orders,
    users,
  };
};

const models = initModels(sequelize);

export default models;
export { sequelize };

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
