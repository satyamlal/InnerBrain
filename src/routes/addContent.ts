import { zod, router, bcrypt } from "../lib.js";
import { AddContentModel } from "../models/addContent.model.js";

const createContentSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  link: zod.string(),
  tags: zod.string(),
});

router.post("/addcontent", async (req, res) => {
  try {
    const result = createContentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(403).json({
        message: "Wrong inputs!",
      });
    }

    const { title, description, link, tags } = result.data;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error instanceof Error ? error.message : "Something Went Wrong!",
    });
  }
});
