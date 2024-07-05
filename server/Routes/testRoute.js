const express = require("express");
const router = express.Router();
// const productstest = require("../data/dummydata");
const { testData, testDataById } = require("../controllers/testController");

router.route("/").get(testData);
router.route("/:id").get(testDataById);

module.exports = router;
