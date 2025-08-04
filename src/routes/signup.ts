import { UserModel } from "../models/user.model.js";
import { router, zod, bcrypt } from "../lib.js";

const signupSchema = zod.object({
  email: zod.string(),
  username: zod.string().min(3),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(411).json({
        message: "Wrong inputs!",
        error: result.error.issues,
      });
    }

    const { email, username, password } = result.data;
    const existingUser = await UserModel.findOne({
      username,
    });

    const existingEmail = await UserModel.findOne({
      email,
    });

    if (existingUser || existingEmail) {
      return res.status(403).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Sign up successfull!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Please come back again!",
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
});

export default router;
