import { TagModel } from "../models/tag.model.js";
import type { Request, Response } from "express";
import { z, router } from "../lib.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { AddContentModel } from "../models/addContent.model.js";

// const objectId = z.string().regex(/^[a-f\d]{24}$/i, {
//   message: "Invalid ObjectId format",
// });

const contentSchema = z.object({
  title: z.string().min(3, "Title is required!"),
  link: z.union([z.url(), z.undefined()]),
  tags: z.array(z.string()).min(1, "Atleast one tag is required!"),
  // groupId: z.string().optional(),
  // visibility: z.enum(["private", "public", "group"]).default("private"),
  // publicSlug: z.string().optional().nullable(),
});

router.post(
  "/addcontent",
  userMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = contentSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(403).json({
          message: "Wrong inputs!",
          errors: result.error.issues,
        });
      }

      const { title, link, tags } = result.data;
      const userId = req.userId;

      const existingData = await AddContentModel.findOne({
        link,
        userId,
      });

      if (existingData) {
        return res.status(409).json({
          message: "You have already added this link!",
        });
      }

      // Step 1: Convert tag names to ObjectId references
      const tagsObjectIds = await Promise.all(
        tags.map(async (tagName) => {
          let tag = await TagModel.findOne({ name: tagName });
          if (!tag) {
            tag = await TagModel.create({ name: tagName });
          }
          return tag._id;
        })
      );

      // Step 2: Create content with ObjectId references
      const content = await AddContentModel.create({
        title,
        link,
        userId,
        tags: tagsObjectIds,
      });
      const contentId = content._id;

      res.status(201).json({
        message: "Content Added!",
        contentId,
      });
    } catch (error) {
      console.error("Content creation error:", error);
      res.status(500).json({
        message: "Internal Server Error!",
        error: error instanceof Error ? error.message : "Something Went Wrong!",
      });
    }
  }
);

// router.post(
//   "/deletecontent",
//   userMiddleware,
//   async (req: Request, res: Response) => {}
// );

export default router;
