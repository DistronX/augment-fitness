const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/items", itemController.getAllItems);
router.post("/items", itemController.createItem);

module.exports = router;
