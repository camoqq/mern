const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@description   Auth user & get token
//@route         POST/api/users/login
//@access        Public
const login_auth = asyncHandler(async (req, res) => {
  // res.send("auth user");
  console.log(req.body); //shows data in terminal from
  //postman/body/urlencoded after putting info such as email
  //and password after clicking send
  //instead of saying req.body.email or req.body.password we deconstruct here
  const { email, password } = req.body;
  //VALIDATE EMAIL: email must match database email
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    //-1- after doing validation create a token
    //jwt.sign= {payload},secret,{expiration}
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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

    res.json({
      _id: user._id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  //VALIDATE PASSWORD in the user model and bring matchPassword
  //which is a method that is now available in user
});

//
//
//

//@description   Register user
//@route         POST/api/users
//@access        Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//@description   Logout user & clear cookie
//@route         POST/api/users/logout
//@access        Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//@description   Get user profile
//@route         GET/api/users/profile
//@access        Public
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@description   Update user profile
//@route         PUT/api/users/profile
//@access        Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//@description   Get users
//@route         GET/api/users
//@access        Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@description   Get user by id
//@route         GET/api/users/:id
//@access        Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//@description   Delete user
//@route         GET/api/users/:id
//@access        Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@description   Update user
//@route         PUT/api/users/:id
//@access        Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

module.exports = {
  login_auth,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
