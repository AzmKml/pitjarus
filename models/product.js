"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.product_brand, { foreignKey: "brand_id" });
      Product.hasMany(models.report_product, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: DataTypes.STRING,
      brand_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "product",
      underscore: true,
      timestamps: false,
    }
  );
  return Product;
};
