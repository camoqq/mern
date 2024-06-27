const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");
// const products = require("../data/Products"); // products coming from folder

//@description   Fetch all products
//@route         GET/api/products
//@access        Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
// router.get(              this used to be in product routes
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );

//@description   Fetch prod by ID
//@route         GET/api/products
//@access        Public
const getProdById = asyncHandler(async (req, res) => {
  // const singleProd = products.find((x) => x._id === req.params.id);
  const singleProd = await Product.findById(req.params.id);
  res.json(singleProd);
});

//@description   Get top rated products
//@route         GET/api/products/top
//@access        Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

module.exports = { getProducts, getProdById, getTopProducts };
