import { UserModel } from "../models/user.model.js";
import { router, z, bcrypt } from "../lib.js";

const signupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username is too short" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
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
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(403).json({
          message: "Username already taken!",
        });
      }
      if (existingUser.email === email) {
        return res.status(403).json({
          message: "Email already exists!",
        });
      }
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
