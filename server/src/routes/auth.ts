import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

router.post("/register", validate(registerSchema), async (req, res) => {
  const { firstName, lastName, email, password } = req.body as z.infer<
    typeof registerSchema
  >;

  const existing = await UserModel.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  // create session
  req.session.userId = user._id.toString();

  return res.status(201).json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

router.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body as z.infer<typeof loginSchema>;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  // create session
  req.session.userId = user._id.toString();

  return res.json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Failed to logout" });
    res.clearCookie("sid");
    return res.json({ ok: true });
  });
});

export default router;
