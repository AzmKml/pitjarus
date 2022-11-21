"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class report_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      report_product.belongsTo(models.Product, { foreignKey: "product_id" });
      report_product.belongsTo(models.store, { foreignKey: "store_id" });
    }
  }
  report_product.init(
    {
      report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      store_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      compliance: DataTypes.INTEGER,
      tanggal: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "report_product",
      tableName: "report_product",
      underscore: true,
      timestamps: false,
    }
  );
  return report_product;
};
