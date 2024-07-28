import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: String,
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  street: {
    type: String,
    required: [true, "Please provide a street address"],
  },
  addressComplement: String,
  postalCode: {
    type: String,
    required: [true, "Please provide a postal code"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  country: String,
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  receiveSms: String,
  landlineNumber: String, 
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  occupation: String,
  annualExpense: String,
  newsletter: {
    type: Boolean,
    default: false,
  },
  conditions: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
