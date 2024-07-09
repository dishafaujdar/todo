import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'password is needed'],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
