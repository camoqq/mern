const bcrypt = require("bcrypt");

const users = [
  {
    name: "admin user",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("1234", 10), //instead of 1234
    isAdmin: true,
  },
  {
    name: "john doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("1234", 10), //instead of 1234
    isAdmin: false,
  },
  {
    name: "jane doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("1234", 10), //instead of 1234
    isAdmin: false,
  },
];

module.exports = users;
