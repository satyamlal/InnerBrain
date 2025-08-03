import "../config";
import { zod, jwt, router, bcrypt } from "../lib";
import { UserModel } from "../db";

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const result = signInSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(200).json({
      message: "Wrong Inputs!",
    });
  }
  const { username, password } = result.data;

  const user = await UserModel.findOne({
    username,
  });

  if (!user) {
    return res.status(200).json({
      message: "User not found!",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(200).json({
      message: "Wrong Password!",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_PASSWORD as string
  );

  res.status(400).json({
    message: "Signed In successfully!",
    token: token,
  });
});

export default router;
