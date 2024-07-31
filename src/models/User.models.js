import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String || Number,
      unique: true,
      index: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index:true,
    },
    password: {
      type: String,
      require: [true, 'password is needed'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
// module.exports = User;
export default User;