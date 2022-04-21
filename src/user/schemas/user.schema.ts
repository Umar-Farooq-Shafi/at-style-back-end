import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: Number,
    default: 0,
  },
  password: String,
  createdAt: Date,
  updatedAt: Date,
});
