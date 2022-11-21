const router = require("express").Router();
const ProductController = require("../controllers/productController");

router.get("/", ProductController.getAreaPercentage);
router.get("/brands", ProductController.getBrandAreaPercentage);

module.exports = router;
