import { UserModel } from "../db";
import { router, zod, bcrypt } from "../lib";

const signupSchema = zod.object({
  username: zod.string().min(3),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Wrong inputs!",
      error: result.error.issues,
    });
  }

  const { username, password } = result.data;
  const existingUser = await UserModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "Username already taken!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    username,
    password: hashedPassword,
  });

  res.status(200).json({
    message: "Sign up successfull!",
  });
});

export default router;
