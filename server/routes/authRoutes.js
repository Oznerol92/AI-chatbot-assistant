// server/routes/authRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
	register,
	login,
	logout,
	getMe,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

module.exports = router;
