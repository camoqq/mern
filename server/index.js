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
const cookieParser = require("cookie-parser");

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
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
app.use(cookieParser());

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("port " + port);
});
