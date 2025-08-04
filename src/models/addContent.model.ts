import { mongoose } from "../lib.js";

const AddContentSchema = new mongoose.Schema({
  title: { unique: true, type: String, required: true },
  link: { unique: true, type: String, required: true },
  tags: [
    { unique: true, type: mongoose.Types.ObjectId, ref: "Tag", required: true },
  ],
  userId: {
    unique: true,
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "group",
  },

  visibility: {
    type: String,
    enum: ["private", "public", "group"],
    default: "private",
  },

  publicSlug: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const AddContentModel = mongoose.model("AddContent", AddContentSchema);

export { AddContentModel };
