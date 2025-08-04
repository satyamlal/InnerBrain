import connectDB from "./db.js";
import signUpRouter from "./routes/signup.js";
import signInRouter from "./routes/signin.js";
import { express } from "./lib.js";

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
await connectDB();

app.use(express.json()); // handles JSON data from Postman
app.use(express.urlencoded({ extended: true })); // handles form data if ever needed

// Routes
app.use("/api/v1", signUpRouter);
app.use("/api/v1", signInRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

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
