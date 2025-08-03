import "./config";
import signUpRouter from "./routes/signup";
import signInRouter from "./routes/signin";
import { express } from "./lib";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", signUpRouter);
app.use("/api/v1", signInRouter);

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
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
