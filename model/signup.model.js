import mongoose from "mongoose";

const SignupShema = mongoose.Schema({
  username: {
    type: String,
    
    trim: true,
  },
  email: { type: String, trim: true },
  password: { type: String, trim: true },

  age: { type: Number, trim: true },
  gender: {
    type: String,
    
    trim: true,
  },
  mobile: { type: Number, trim: true },

  dob: { type: Date, },
  // confirmPassword: { type: String ,trim:true}
});

export const SignUpModel = mongoose.model("logsign", SignupShema);