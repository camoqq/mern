const Test = require("../models/testModel");
// const Product = require("../models/productModel");
// const productstest = require("../data/dummydata");

const testData = async (req, res) => {
  // res.json(productstest);

  // const prods = await Product.find({});
  const prods = await Test.find({});
  res.json(prods);
};

const testDataById = async (req, res) => {
  // (req, res) => {
  //   const idprod = productstest.find((x) => x._id === x.params.id);
  //   res.json(idprod);
  // };
  const prod = await Test.findById(req.params.id);
  res.json(prod);
};

module.exports = { testData, testDataById };
