const bcrypt = require("bcrypt");

const users = [
  {
    name: "admin user",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "john doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "jane doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

module.exports = users;
