import jwt from "jsonwebtoken";
import express from "express";
import { authenticateJwt, SECRET } from "../middleware/";
import { User } from "../db";
// import { signupInput } from "@100xdevs/common";
import { z } from "zod";
const signupInput = z.object({
  username: z.string().min(1).max(10).email(),
  password: z.string().min(6).max(20),
});
const router = express.Router();

router.post("/signup", async (req, res) => {
  let parsedInput = signupInput.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(403).json({
      error: parsedInput.error,
    });
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;

  const user = await User.findOne({ username: parsedInput.data.username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  }
});

const loginInput = z.object({
  username: z.string().min(1).max(10).email(),
  password: z.string().min(6).max(20),
});

router.post("/login", async (req, res) => {
  const parsedInput = loginInput.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(403).json({
      message: "Invalid username or password format",
    });
  }

  const { username, password } = parsedInput.data;

  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

const meInput = z.object({
  userId: z.string().uuid(), // Assuming userId is a UUID
});

router.get("/me", async (req, res) => {
  const parsedInput = meInput.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(403).json({
      message: "Invalid request format",
    });
  }

  const userId = parsedInput.data.userId;
  // Assuming authenticateJwt middleware has already validated the JWT token

  const user = await User.findOne({ _id: userId });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

export default router;
