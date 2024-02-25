import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullname: { require: true, type: String },
  username: { require: true, type: String, unique: true },
  password: { require: true, type: String, minlength: 6 },
  gender: { require: true, type: String, enum: ["male", "female"] },
  profilePic: { type: String, default: "" },
});

export default mongoose.model("User",userSchema);
