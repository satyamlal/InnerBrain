import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const jwtSecret = process.env.JWT_PASSWORD as string;
if (!jwtSecret) {
  throw new Error("JWT_PASSWORD not set in .env file!");
}

const MONGO_URI = process.env.MONGO_URI as string;

export { __dirname, jwtSecret, MONGO_URI };
