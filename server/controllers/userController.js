const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//@description   Auth user & get token
//@route         POST/api/users/login
//@access        Public
const login_auth = asyncHandler(async (req, res) => {
  // res.send("auth user");
  console.log(req.body); //shows data in terminal from
  //postman/body/urlencoded after putting info such as email
  //and password after clicking send
  //
  //instead of saying req.body.email or req.body.password we deconstruct here
  const { email, password } = req.body;
  //
  //VALIDATE EMAIL: email must match database email
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    //-1- after doing validation create a token
    //jwt.sign= {payload},secret,{expiration}
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
  // res.send("register user");
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@description   Logout user & clear cookie
//@route         POST/api/users/logout
//@access        Private
const logoutUser = asyncHandler(async (req, res) => {
  // res.send("logout user");
  // res.cookie("jwtName", "", {
  //   httpOnly: true,
  //   expiresIn: new Date(0),
  // });
  res.clearCookie("jwtName");
  // res.status(200);
  res.status(200).json({ message: "Logged out succesfully" });
});

//@description   Get user profile
//@route         GET/api/users/profile
//@access        Public
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send("get user profile");
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description   Update user profile
//@route         PUT/api/users/profile
//@access        Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    //update user or leave user as it was
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    //only do it if you are updating the password
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updated = await user.save();
    res.status(200).json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
