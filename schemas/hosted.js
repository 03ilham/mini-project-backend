const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hosted', {
    hosted_acc: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('hosted_id'),
      primaryKey: true
    },
    hosted_fullname: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    hosted_level: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hosted',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hosted_acc_pk",
        unique: true,
        fields: [
          { name: "hosted_acc" },
        ]
      },
    ]
  });
};
