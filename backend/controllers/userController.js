// userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const jwtSecret = "your-secret-key"; // Replace with your own secret key

// Register a new user
const userController = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, phone_number } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      const newUser = new User({ name, email, password, phone_number });
      const savedUser = await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ userId: savedUser._id }, jwtSecret);

      res.status(201).json({ user: savedUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering user" });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists and the password is correct
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret);

      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in user" });
    }
  },

  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      // The user information is available in req.user due to the middleware
      const user = req.user;
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting user profile" });
    }
  },
};
module.exports = userController;
