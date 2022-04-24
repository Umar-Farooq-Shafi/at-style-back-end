import * as mongoose from 'mongoose';

// schema for user
export const UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: {
    type: String,
    default: '',
  },
  phone: Number,
  password: String,
  referralCode: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
