const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  calExport: { type: Boolean },
  access_token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
