const express = require("express");
const router = express.Router();
const {
  login_auth,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/login", login_auth);
//register / get users is admin
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);
//
module.exports = router;
