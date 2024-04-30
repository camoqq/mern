const express = require("express");
const app = express();
// const products = require("./data/Products");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
port = process.env.PORT;
const productRoutes = require("./Routes/productRoutes");

var cors = require("cors");
app.use(cors());

connectDB();
app.get("/", (req, res) => {
  res.send("page working");
});
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("port " + port);
});
