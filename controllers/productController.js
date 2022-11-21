const {
  Product,
  product_brand,
  report_product,
  store,
  store_account,
  store_area,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");

class ProductController {
  static async getAreaPercentage(req, res) {
    try {
      const { area, dateTo, dateFrom } = req.query;

      const data1 = await store_area.findAll({
        attributes: ["area_name"],
        include: [
          {
            model: store,
            attributes: ["area_id"],
            include: {
              model: report_product,
              attributes: [
                [
                  sequelize.literal(
                    "(SUM(compliance) / COUNT(compliance) * 100 )"
                  ),
                  "nilai",
                ],
              ],
            },
          },
        ],
        group: ["area_name"],
      });

      let select =
        "SELECT  area_name, (SUM(compliance) / COUNT(compliance) * 100) AS nilai  FROM product_brand pb ";
      let join = `JOIN product p ON pb.brand_id = p.brand_id 
      JOIN report_product rp  ON p.product_id = rp.product_id 
      JOIN store s ON rp.store_id = s.store_id 
      JOIN store_area sa ON sa.area_id = s.area_id `;
      let where = "";
      let group = "GROUP BY area_name ";
      let query = select + join + group;
      if (area || dateFrom || dateTo) {
        let listQuery = "";
        if (area) {
          listQuery += area
            .map((el) => (el = `area_name = '${el}'`))
            .join(" OR ");
        }
        if (dateFrom && listQuery.length) {
          listQuery += ` AND tanggal >= '${dateFrom}'`;
        } else if (dateFrom) {
          listQuery = `tanggal >= '${dateFrom}'`;
        }
        if (dateTo && listQuery.length) {
          listQuery += ` AND tanggal <= '${dateTo}'`;
        } else if (dateTo) {
          listQuery = `tanggal <= '${dateTo}'`;
        }
        where = `WHERE ` + listQuery + " ";
        query = select + join + where + group;
      }

      const data2 = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      res.status(200).json(data2);
    } catch (error) {
      console.log(error);
    }
  }

  static async getBrandAreaPercentage(req, res) {
    try {
      const { area, dateTo, dateFrom } = req.query;
      let select =
        "SELECT brand_name, area_name, (SUM(compliance) / COUNT(compliance) * 100) AS nilai  FROM product_brand pb ";
      let join = `JOIN product p ON pb.brand_id = p.brand_id 
    JOIN report_product rp  ON p.product_id = rp.product_id 
    JOIN store s ON rp.store_id = s.store_id 
    JOIN store_area sa ON sa.area_id = s.area_id `;
      let where = "";
      let group = "GROUP BY brand_name, area_name ";
      let query = select + join + group;
      if (area || dateFrom || dateTo) {
        let listQuery = "";
        if (area) {
          listQuery += area
            .map((el) => (el = `area_name = '${el}'`))
            .join(" OR ");
        }
        if (dateFrom && listQuery.length) {
          listQuery += ` AND tanggal >= '${dateFrom}'`;
        } else if (dateFrom) {
          listQuery = `tanggal >= '${dateFrom}'`;
        }
        if (dateTo && listQuery.length) {
          listQuery += ` AND tanggal <= '${dateTo}'`;
        } else if (dateTo) {
          listQuery = `tanggal <= '${dateTo}'`;
        }
        where = `WHERE ` + listQuery + " ";
        query = select + join + where + group;
      }
      const storeArea = await store_area.findAll();

      const data = await sequelize.query(query, { type: QueryTypes.SELECT });
      let obj = {};

      data.forEach((el, id) => {
        // if (!obj[el.brand_name]) {
        //   obj[el.brand_name] = [];
        // }
        // obj[el.brand_name].push({ area_name: el.area_name, nilai: el.nilai });
        for (let i = 0; i < storeArea.length; i++) {
          if (el.area_name === storeArea[i].area_name) {
            if (!obj[el.brand_name]) {
              obj[el.brand_name] = [];
            }
            obj[el.brand_name][i] = el.nilai;

            break;
          }
        }
      });
      for (const el in obj) {
        for (let i = 0; i < storeArea.length; i++) {
          if (!obj[el][i]) {
            obj[el][i] = "-";
          }
        }
      }
      // console.log(storeArea);
      console.log(obj, "===============");
      res.status(200).json(obj);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;
