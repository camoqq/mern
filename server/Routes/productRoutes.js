const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProdById,
} = require("../controllers/productController");

//this used to be in index.js
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// app.get("/api/products/:id", (req, res) => {
//   const singleProd = products.find((x) => x._id === req.params.id);
//   res.json(singleProd);
// });
router.route("/").get(getProducts);
router.route("/:id").get(getProdById);

module.exports = router;
