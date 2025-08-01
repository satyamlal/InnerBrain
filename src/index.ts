import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

app.post("/api/v1/signin", (req, res) => {
  res.json({
    message: "Post Sign In route!",
  });
});

app.post("/api/v1/signup", (req, res) => {
  res.json({
    message: "Post Sign Up Route!",
  });
});

app.post("/api/v1/content", (req, res) => {
  res.json({
    message: "Post request for Content Page!",
  });
});

app.get("/api/v1/content", (req, res) => {
  res.json({
    message: "Get request for Content Page!",
  });
});

app.delete("/api/v1/content", (req, res) => {
  res.json({
    message: "Delete request for Content Page!",
  });
});

app.post("/api/v1/brain/share", (req, res) => {
  res.json({
    message: "Share your InnerBrain content publically!",
  });
});

app.post("/api/v1/brain/:shareLink", (req, res) => {
  res.json({
    message: "Someone else's Inner Brain Link",
  });
});
