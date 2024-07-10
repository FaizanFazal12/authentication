const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  profile: {
    type: String,
  },

  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
