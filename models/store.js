"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      store.hasMany(models.report_product, { foreignKey: "store_id" });
      store.belongsTo(models.store_account, { foreignKey: "account_id" });
      store.belongsTo(models.store_area, { foreignKey: "area_id" });
    }
  }
  store.init(
    {
      store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      store_name: DataTypes.STRING,
      account_id: DataTypes.INTEGER,
      area_id: DataTypes.INTEGER,
      is_active: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "store",
      tableName: "store",
      underscore: true,
      timestamps: false,
    }
  );
  return store;
};
