import { jwtSecret } from "../config.js";
import { z, jwt, router, bcrypt } from "../lib.js";
import { UserModel } from "../models/user.model.js";

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

if (!jwtSecret) {
  throw new Error("JWT_PASSWORD is not set in .env file!");
}

router.post("/signin", async (req, res) => {
  try {
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
      return res.status(403).json({
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        message: "Wrong Password!",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret
    );

    res.status(200).json({
      message: "Signed In successfully!",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Please come back again!",
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
});

export default router;
