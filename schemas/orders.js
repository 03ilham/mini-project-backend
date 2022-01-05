const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('order_id'),
      primaryKey: true
    },
    order_created: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_tax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_promo: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    order_payment_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    order_payment_trx: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    order_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_name_pk",
        unique: true,
        fields: [
          { name: "order_name" },
        ]
      },
    ]
  });
};
