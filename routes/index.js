const express = require("express");
const router = express.Router();
const productRouter = require("./productsRouter");

router.use("/products", productRouter);

module.exports = router;
