import signUpRouter from "./routes/signup.js";
import signInRouter from "./routes/signin.js";
import dotenv from "dotenv";
import { express } from "./lib.js";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", signUpRouter);
app.use("/api/v1", signInRouter);

// app.post("/api/v1/content", (req, res) => {
//   res.json({
//     message: "Post request for Content Page!",
//   });
// });

// app.get("/api/v1/content", (req, res) => {
//   res.json({
//     message: "Get request for Content Page!",
//   });
// });

// app.delete("/api/v1/content", (req, res) => {
//   res.json({
//     message: "Delete request for Content Page!",
//   });
// });

// app.post("/api/v1/brain/share", (req, res) => {
//   res.json({
//     message: "Share your InnerBrain content publically!",
//   });
// });

// app.post("/api/v1/brain/:shareLink", (req, res) => {
//   res.json({
//     message: "Someone else's Inner Brain Link",
//   });
// });
