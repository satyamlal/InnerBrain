import { mongoose } from "../lib.js";

const UserSchema = new mongoose.Schema({
  email: { unique: true, type: String, required: true },
  username: { unique: true, type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
