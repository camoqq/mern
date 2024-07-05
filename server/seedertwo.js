const dotenv = require("dotenv");
const connectDB = require("./config/db");
const products = require("./data/dummydata");
const Test = require("./models/testModel");

dotenv.config();
connectDB();

const importTest = async () => {
  try {
    await Test.deleteMany();
    await Test.insertMany(products);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyTest = async () => {
  try {
    await Test.deleteMany();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyTest();
} else {
  importTest();
}
