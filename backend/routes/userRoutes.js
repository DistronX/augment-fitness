const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authRequired = require("../middleware/AuthRequired");

router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getuser", userController.getUserProfile);

module.exports = router;