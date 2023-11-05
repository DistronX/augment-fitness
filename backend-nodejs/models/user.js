const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone_num: {
      type: String,
      required: true,
      unique: true,
    },

    jwtToken: [String],
  },

  { timestamps: true }
);

UserSchema.index({ name: "text", email: "text" });
module.exports = mongoose.model("User", UserSchema);
