import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { unique: true, type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
