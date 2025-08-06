import { mongoose } from "../lib.js";

const AddContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, required: true, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },

  // groupId: {
  //   unique: true,
  //   type: mongoose.Types.ObjectId,
  //   ref: "group",
  // },

  // visibility: {
  //   type: String,
  //   enum: ["private", "public", "group"],
  //   default: "private",
  // },

  // publicSlug: {
  //   unique: true,
  //   type: String,
  //   sparse: true,
  // },
});

// Add compound unique index for user-specific link uniqueness
AddContentSchema.index({ link: 1 }, { unique: true });

const AddContentModel = mongoose.model("Contents", AddContentSchema);

export { AddContentModel };
