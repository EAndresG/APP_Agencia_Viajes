const express = require("express");
const { getAdminProfile } = require("../controllers/adminController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getAdminProfile);

module.exports = router;