const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  ip: {
    type: String,
    required: true
  },

  counts: {
    type: Number,
    required: true
  }
});

module.exports = Users = mongoose.model("users", UserSchema);
