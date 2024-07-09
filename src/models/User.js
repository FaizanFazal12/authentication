const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password:{
    type: String,
  },
  role:{
    type: String,
    default: 'user'
  }
});

const User = mongoose.model | mongoose.model('User',UserSchema);
export default User