import mongoose from 'mongoose';
import { UserRole } from './types';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please, provide a username'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'Please, provide an email'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please, provide a password'],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
