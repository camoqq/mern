// const path = require("path");
const express = require("express");
const app = express();
// const products = require("./data/Products");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
port = process.env.PORT;
const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const cookieParser = require("cookie-parser");
const productstest = require("./data/dummydata");
const testRoute = require("./Routes/testRoute");

//Body parser middleware
// in postman under body
app.use(express.json());
// in postman under body/raw. you can pass json
app.use(express.urlencoded({ extended: true }));
// in postman under body/urlencoded. you can pass key and value

connectDB();
app.get("/", (req, res) => {
  res.send("page working");
});

app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// ------------------------------------------------------
// app.use("/api/test", testRoute);
// app.get("/api/test/:id", (req, res) => {
//   const idprod = productstest.find((x) => x._id === x.params.id);
//   res.json(productstest);
// });

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("port " + port);
});
