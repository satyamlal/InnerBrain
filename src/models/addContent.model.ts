import { mongoose } from "../lib.js";

// const AddContentSchema = new mongoose.Schema({
//   title: { unique: true, type: String, required: true },
//   link: { unique: true, type: String, required: true },
//   tags: [
//     { unique: true, type: mongoose.Types.ObjectId, ref: "Tag", required: true },
//   ],
//   userId: {
//     unique: true,
//     type: mongoose.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   groupId: {
//     type: mongoose.Types.ObjectId,
//     ref: "group",
//   },

// });

const AddContentSchema = new mongoose.Schema({
  title: { unique: true, type: String, required: true },
  link: { unique: true, type: String },
  tags: [{ type: mongoose.Types.ObjectId, required: true, ref: "Tag" }],

  userId: {
    unique: true,
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

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

const AddContentModel = mongoose.model("Contents", AddContentSchema);

export { AddContentModel };
