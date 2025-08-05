import { mongoose } from "../lib.js";

const TagsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const TagModel = mongoose.model("Tag", TagsSchema);

export { TagModel };
