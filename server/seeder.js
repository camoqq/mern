const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const users = require("./data/Users");
const products = require("./data/Products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser }; //adds the admin id to the product object
    });

    await Product.insertMany(sampleProducts);

    console.log("data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// console.log(process.argv); and comment out everything in this file
// console.log(process.argv[0]); path in node
// console.log(process.argv[1]); path in node
// console.log(process.argv[2]); is whatever you pass when you run
//                               node server/seeder
//create scrypt in package.json for it
