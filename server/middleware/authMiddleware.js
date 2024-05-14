const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Protected Routes-install cookie-parser
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //read the jwt from cookie
  token = req.cookies?.jwtName;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   decoded has acces to userId because it was created in userControllers
      //-------------------------------we dont want the password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error("Not Authorized as Admin");
  }
};

module.exports = {
  protect,
  admin,
};
