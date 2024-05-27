const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authMiddleware");
const authController = require("../controller/authController");

router.post("/register", authController.registerUser);

router.get("/currentUser", validateToken, authController.getCurrentUser);

router.put("/update/:id", validateToken, authController.updateUser);

router.post("/login", authController.userLogin);

router.get("/getUserById/:id", validateToken, authController.getUserById);

module.exports = router;
