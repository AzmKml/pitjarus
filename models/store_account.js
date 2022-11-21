"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class store_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      store_account.hasMany(models.store, { foreignKey: "account_id" });
    }
  }
  store_account.init(
    {
      account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "store_account",
      tableName: "store_account",
      underscore: true,
      timestamps: false,
    }
  );
  return store_account;
};
