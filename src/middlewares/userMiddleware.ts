import { jwtSecret } from "../config.js";
import type { Request, Response, NextFunction } from "express";
import { jwt } from "../lib.js";

if (!jwtSecret) {
  throw new Error("JWT_PASSWORD is not set in .env file!");
}

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  if (!header || !header.startsWith("Bearer ")) {
    console.log("Authorization header:", header);
    return res.status(401).json({
      message: "Authorization header missing!",
    });
  }

  const token = header.split(" ")[1];
  if (!token) {
    console.log("Token extracted:", token);
    return res.status(401).json({
      message: "Token missing!",
    });
  }

  try {
    const decode = jwt.verify(token, jwtSecret) as {
      userId: string;
    };

    if (decode) {
      // Overrides the types of the express request using : src/types/express/index.d.ts
      req.userId = decode.userId;
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      error: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};
