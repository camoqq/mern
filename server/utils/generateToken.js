const jwt = require("jsonwebtoken");

// userId has to be the same one from authMiddleware
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //-2- set jwt as a HTTP-only Cookie
  //res.cookie(name,val,options)
  res.cookie("jwtName", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days because is in milisecs
  });
};

module.exports = generateToken;
