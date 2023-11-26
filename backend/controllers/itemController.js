const Item = require("../models/itemModel");

const itemController = {
  getAllItems: async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  createItem: async (req, res) => {
    const { name, description } = req.body;
    try {
      const newItem = new Item({ name, description });
      await newItem.save();
      res.json(newItem);
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  },
};

module.exports = itemController;
